import { apiPopularMovies, apiTopRatedMovies } from '@/apis/config';
import MovieCard from '@/components/MovieCard';
import TrendingCard from '@/components/TrendingCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Movie } from '@/interfaces/interfaces';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View
} from 'react-native';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingPopular, setIsLoadingPopular] = useState<boolean>(true);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  const fetchPopularMovies = async () => {
    const response = await apiPopularMovies();
    if (response.results) {
      setPopularMovies(response.results);
      setIsLoadingPopular(false);
    }
  };

  const fetchTopRatedMovies = async () => {
    const response = await apiTopRatedMovies();
    if (response.results) {
      setTopRatedMovies(response.results);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
    fetchTopRatedMovies();
  }, []);

  return (
    <View className='flex-1 bg-primary'>
      <Image
        source={images.bg}
        className='absolute top-0 left-0 z-0 w-full'
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
        className='flex-1 px-5'
      >
        <Image
          source={icons.logo}
          className='w-12 h-10 mx-auto mt-20 mb-5'
        />
        <View className='flex-1'>
          {isLoading ||
            (isLoadingPopular && (
              <ActivityIndicator
                size='large'
                color='#0000ff'
                className='mt-10'
              />
            ))}
          {topRatedMovies.length > 0 && (
            <View className='mt-10'>
              <Text className='mb-3 text-lg font-bold text-white'>
                Phim xu hướng
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                className='mt-3 mb-4'
                data={popularMovies}
                contentContainerStyle={{
                  gap: 26
                }}
                renderItem={({ item, index }) => (
                  <TrendingCard
                    movie={item}
                    index={index}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View className='w-4' />}
              />
            </View>
          )}
          {topRatedMovies.length > 0 && (
            <>
              <Text className='mt-5 mb-3 text-lg font-bold text-white'>
                Phim xếp hạng hàng đầu
              </Text>
              <FlatList
                data={topRatedMovies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10
                }}
                className='pb-32 mt-2'
                scrollEnabled={false}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;
