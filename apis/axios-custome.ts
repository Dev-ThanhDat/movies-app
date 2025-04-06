import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_MOVIE_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_TOKEN}`
  }
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response && response.data ? response.data : response;
  },
  function (error) {
    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
