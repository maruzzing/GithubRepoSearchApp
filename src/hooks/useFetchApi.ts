import { AxiosResponse } from 'axios';
import { useReducer, useEffect } from 'react';

interface State<T> {
  loading: boolean;
  error: boolean;
  data: T;
}

type Action<T> =
  | { type: 'FETCH_INIT' }
  | {
      type: 'FETCH_SUCCESS';
      payload: T;
    }
  | { type: 'FETCH_FAILURE' };

const fetchReducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

const useFetchApi = <T>({
  fetchApi,
  initialData,
}: {
  fetchApi?: () => Promise<AxiosResponse<T>>;
  initialData: T;
}): { state: State<T>; fetchData: () => void } => {
  const [state, dispatch] = useReducer<React.Reducer<State<T>, Action<T>>>(fetchReducer, {
    loading: false,
    error: false,
    data: initialData,
  });

  const fetchData = async () => {
    if (!fetchApi) return;
    dispatch({ type: 'FETCH_INIT' });
    try {
      const { data } = await fetchApi();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_FAILURE' });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { state, fetchData };
};

export default useFetchApi;
