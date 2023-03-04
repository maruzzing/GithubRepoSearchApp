import { useReducer, useEffect, useState, useRef } from 'react';
import { axiosInstance } from '@/services/instance';

import { SEARCH_LIMIT } from '@/services/constants';

const fetchReducer = (state: any, action: any) => {
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
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        loadingNextPage: false,
        count: action.payload.count,
      };
    case 'NEXT_PAGE_FETCH_SUCCESS':
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        loading: false,
        loadingNextPage: false,
        count: action.payload.count,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        loadingNextPage: false,
        error: true,
      };
    case 'RESET':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  loadingNextPage: false,
  error: false,
  count: 0,
  data: [],
};

const useInfiniteFetchApi = ({ apiConfig: initialApiConfig, formatData }: any) => {
  const cancelled = useRef(false);

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const [apiConfig, setApiConfig] = useState(initialApiConfig);

  const reset = () => {
    setApiConfig({});
    dispatch({ type: 'RESET', payload: initialState });
  };

  const fetchNextPage = async () => {
    if (!apiConfig || !apiConfig.url || state.count <= state.data.length || state.loadingNextPage || state.loading)
      return;
    dispatch({ type: 'NEXT_PAGE_FETCH_INIT' });
    try {
      const updatedApiConfig = {
        ...apiConfig,
        params: { ...apiConfig.params, page: Math.floor(state.data.length / SEARCH_LIMIT) + 1 },
      };
      const { data } = await axiosInstance(updatedApiConfig);
      if (!cancelled.current) dispatch({ type: 'NEXT_PAGE_FETCH_SUCCESS', payload: { ...formatData(data) } });
    } catch (err) {
      if (!cancelled.current) dispatch({ type: 'FETCH_FAILURE', payload: err });
    }
  };

  const fetchData = async () => {
    if (!apiConfig || !apiConfig.url || state.loadingNextPage || state.loading) return;
    dispatch({ type: 'FETCH_INIT' });
    try {
      const { data } = await axiosInstance(apiConfig);
      if (!cancelled.current) dispatch({ type: 'FETCH_SUCCESS', payload: formatData(data) });
    } catch (err) {
      if (!cancelled.current) dispatch({ type: 'FETCH_FAILURE', payload: err });
    }
  };

  useEffect(() => {
    cancelled.current = false;
    fetchData();

    return () => {
      cancelled.current = true;
    };
  }, [apiConfig]);

  return { state, reset, setApiConfig, fetchNextPage };
};

export default useInfiniteFetchApi;
