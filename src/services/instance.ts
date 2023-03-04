import axios from 'axios';
import { Alert } from 'react-native/types';

export const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.nightshade-preview+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response?.status === 403) {
      return new Promise(resolve => {
        Alert.alert('요청 허용 한도를 초과했습니다.', '나중에 다시 만나요!', [{ text: '확인', onPress: resolve }]);
      });
    }
    return Promise.reject(error);
  },
);
