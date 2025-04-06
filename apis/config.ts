import { MovieDetails, MoviesResource } from '@/interfaces/interfaces';
import axios from './axios-custome';

export const apiTopRatedMovies = () => {
  return axios.get<MoviesResource, any>('/movie/top_rated?language=vi-VI');
};

export const apiPopularMovies = () => {
  return axios.get<MoviesResource, any>('/movie/popular?language=vi-VI');
};

export const apiGetSearchMovies = (query?: string) => {
  const endpoint = query
    ? `/search/movie?query=${query}&language=vi-VI`
    : '/movie/upcoming?language=vi-VI';
  return axios.get<MoviesResource, any>(endpoint);
};

export const apiGetDetails = (id: string) => {
  return axios.get<MovieDetails, any>(`/movie/${id}?language=vi-VI`);
};
