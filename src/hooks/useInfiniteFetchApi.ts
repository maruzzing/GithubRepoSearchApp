import { useReducer, useEffect, useState } from 'react';
import { axiosInstance } from '@/services/instance';

import { PER_PAGE } from '@/services/constants';
import { AxiosRequestConfig } from 'axios';

interface State<T> {
  loading: boolean;
  loadingNextPage: boolean;
  error: boolean;
  count: number;
  data: Array<T>;
}

const initialState = {
  loading: false,
  loadingNextPage: false,
  error: false,
  count: 0,
  data: [],
};

type Action<T> =
  | { type: 'FETCH_INIT' | 'NEXT_PAGE_FETCH_INIT' }
  | {
      type: 'FETCH_SUCCESS' | 'NEXT_PAGE_FETCH_SUCCESS';
      payload: Pick<State<T>, 'data'> & { count?: State<T>['count'] };
    }
  | { type: 'FETCH_FAILURE' };

const fetchReducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
        loadingNextPage: false,
        error: false,
        data: [],
        count: 0,
      };
    case 'NEXT_PAGE_FETCH_INIT':
      return {
        ...state,
        loading: false,
        loadingNextPage: true,
        error: false,
        count: 0,
      };
    case 'FETCH_SUCCESS':
      if (action.payload) {
        return {
          ...state,
          data: action.payload.data,
          loading: false,
          loadingNextPage: false,
          count: action.payload.count ?? action.payload.data.length,
        };
      }
      return state;
    case 'NEXT_PAGE_FETCH_SUCCESS':
      if (action.payload) {
        const result = [...state.data, ...action.payload.data];
        return {
          ...state,
          data: result,
          loading: false,
          loadingNextPage: false,
          count: action.payload.count ?? (action.payload.data.length ? result.length + 1 : state.data.length),
        };
      }
      return state;
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        loadingNextPage: false,
        error: true,
      };
    default:
      return state;
  }
};

const useInfiniteFetchApi = <T>({
  apiConfig: initialApiConfig = {},
  formData,
}: {
  apiConfig?: AxiosRequestConfig;
  formData: (d: any) => { data: Array<T>; count?: number };
}): {
  state: State<T>;
  setApiConfig: React.Dispatch<React.SetStateAction<AxiosRequestConfig>>;
  fetchNextPage: () => void;
} => {
  const [state, dispatch] = useReducer<React.Reducer<State<T>, Action<T>>>(fetchReducer, initialState);

  const [apiConfig, setApiConfig] = useState(initialApiConfig);

  const fetchNextPage = async () => {
    if (!apiConfig || !apiConfig.url || state.count <= state.data.length || state.loadingNextPage || state.loading)
      return;
    dispatch({ type: 'NEXT_PAGE_FETCH_INIT' });
    try {
      const updatedApiConfig = {
        ...apiConfig,
        params: { ...apiConfig.params, page: Math.floor(state.data.length / PER_PAGE) + 1 },
      };
      const { data } = await axiosInstance(updatedApiConfig);
      dispatch({ type: 'NEXT_PAGE_FETCH_SUCCESS', payload: { ...formData(data) } });
    } catch (err) {
      dispatch({ type: 'FETCH_FAILURE' });
    }
  };

  const fetchData = async () => {
    if (!apiConfig.url || state.loadingNextPage || state.loading) return;
    dispatch({ type: 'FETCH_INIT' });
    try {
      const { data } = await axiosInstance(apiConfig);
      dispatch({ type: 'FETCH_SUCCESS', payload: formData(data) });
    } catch (err) {
      dispatch({ type: 'FETCH_FAILURE' });
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiConfig]);

  return { state, setApiConfig, fetchNextPage };
};

export default useInfiniteFetchApi;
