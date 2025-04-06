import { images } from '@/constants/images';
import { TrendingCardProps } from '@/interfaces/interfaces';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const TrendingCard = ({
  movie: { id, title, poster_path },
  index
}: TrendingCardProps) => {
  return (
    <Link
      href={`/movie/${id}`}
      asChild
    >
      <TouchableOpacity className='relative w-32 pl-5'>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://placehold.co/600x400/1a1a1a/FFFFFF.png'
          }}
          className='w-32 h-48 rounded-lg'
          resizeMode='cover'
        />

        <View className='absolute px-2 py-1 rounded-full bottom-8 -left-3.5'>
          <MaskedView
            maskElement={
              <Text className='text-6xl font-bold text-white'>{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className='size-14'
              resizeMode='cover'
            />
          </MaskedView>
        </View>
        <Text
          className='mt-2 text-sm font-bold text-light-200'
          numberOfLines={1}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
