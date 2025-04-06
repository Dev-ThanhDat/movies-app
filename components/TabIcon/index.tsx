import { images } from '@/constants/images';
import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className='flex flex-row w-full flex-1 min-w-[112px] min-h-[40px] mt-4 justify-center items-center rounded-full overflow-hidden'
      >
        <Image
          source={icon}
          tintColor='#151312'
          className='size-5'
        />
        <Text className='ml-2 text-base font-semibold text-secondary'>
          {title}
        </Text>
      </ImageBackground>
    );
  }
  return (
    <View className='items-center justify-center mt-4 rounded-full size-full'>
      <Image
        source={icon}
        tintColor='#A8B5DB'
        className='size-5'
      />
    </View>
  );
};

export default TabIcon;
