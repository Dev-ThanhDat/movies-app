import { apiGetSearchMovies } from '@/apis/config';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Movie } from '@/interfaces/interfaces';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchMovies = async (query?: string) => {
    setIsLoading(true);
    try {
      const response = await apiGetSearchMovies(query);
      if (response.results) {
        setMovies(response.results);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchMovies(searchQuery.trim() ? searchQuery : undefined);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <View className='flex-1 bg-primary'>
      <Image
        source={images.bg}
        className='absolute top-0 left-0 z-0 w-full'
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 16,
          marginVertical: 16
        }}
        className='px-5'
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <>
            {!isLoading && (
              <View className='px-5 mt-10'>
                <Text className='text-center text-gray-500'>
                  {searchQuery.trim()
                    ? 'Không tìm thấy phim'
                    : 'Bắt đầu gõ để tìm kiếm phim'}
                </Text>
              </View>
            )}
          </>
        }
        ListHeaderComponent={
          <>
            <View className='flex-row items-center justify-center w-full mt-20'>
              <Image
                source={icons.logo}
                className='w-12 h-10'
              />
            </View>
            <View className='my-5'>
              <SearchBar
                placeholder='Tìm kiếm một bộ phim...'
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>
            {isLoading && (
              <ActivityIndicator
                size='large'
                color='#0000ff'
                className='my-3'
              />
            )}
            {!isLoading && searchQuery.trim() && movies.length > 0 && (
              <Text className='text-xl font-bold text-white'>
                Kết quả tìm kiếm của:{' '}
                <Text className='text-accent'>{searchQuery}</Text>
              </Text>
            )}
          </>
        }
      />
    </View>
  );
};

export default SearchPage;
