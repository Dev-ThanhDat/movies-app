import { apiGetDetails } from '@/apis/config';
import MovieInfo from '@/components/MovieInfo';
import { icons } from '@/constants/icons';
import { MovieDetails } from '@/interfaces/interfaces';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const DetailsMovie = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movie, setMovie] = useState<MovieDetails>();

  const fetchDetailsMovies = async (id: string) => {
    const response = await apiGetDetails(id);
    if (response) {
      setMovie(response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailsMovies(new String(id).toString());
  }, [id]);

  if (isLoading)
    return (
      <View className='flex items-center justify-center flex-1 bg-primary'>
        <ActivityIndicator size='large' />
      </View>
    );

  return (
    <View className='flex-1 bg-primary'>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
            }}
            className='w-full h-[550px]'
            resizeMode='stretch'
          />
          <TouchableOpacity className='absolute flex items-center justify-center bg-white rounded-full bottom-5 right-5 size-14'>
            <Image
              source={icons.play}
              className='w-6 ml-1 h-7'
              resizeMode='stretch'
            />
          </TouchableOpacity>
        </View>
        <View className='flex-col items-start justify-center px-5 mt-5'>
          <Text className='text-xl font-bold text-white'>{movie?.title}</Text>
          <View className='flex-row items-center mt-2 gap-x-1'>
            <Text className='text-sm text-light-200'>
              {movie?.release_date?.split('-')[0]} •
            </Text>
            <Text className='text-sm text-light-200'>
              {movie?.runtime} phút
            </Text>
          </View>
          <View className='flex-row items-center px-2 py-1 mt-2 rounded-md bg-dark-100 gap-x-1'>
            <Image
              source={icons.star}
              className='size-4'
            />
            <Text className='text-sm font-bold text-white'>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className='text-sm text-light-200'>
              ({movie?.vote_count} đánh giá)
            </Text>
          </View>
          <MovieInfo
            label='Tổng quan'
            value={movie?.overview}
          />
          <MovieInfo
            label='Thể loại'
            value={movie?.genres?.map((g) => g.name).join(' • ') || 'N/A'}
          />
          <View className='flex flex-row justify-between w-1/2 gap-5'>
            <MovieInfo
              label='Ngân sách'
              value={`${((movie?.budget ?? 0) * 23_500).toLocaleString(
                'vi-VN'
              )} VND`}
            />
            <MovieInfo
              label='Doanh thu'
              value={`${((movie?.revenue ?? 0) * 23_500).toLocaleString(
                'vi-VN'
              )} VND`}
            />
          </View>
          <MovieInfo
            label='Công ty sản xuất'
            value={
              movie?.production_companies?.map((c) => c.name).join(' • ') ||
              'N/A'
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50'
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className='size-5 mr-1 mt-0.5 rotate-180'
          tintColor='#fff'
        />
        <Text className='text-base font-semibold text-white'>Quay trở lại</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailsMovie;
