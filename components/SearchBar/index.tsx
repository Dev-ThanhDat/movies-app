import { icons } from '@/constants/icons';
import { SearchBarProps } from '@/interfaces/interfaces';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  onPress
}: SearchBarProps) => {
  return (
    <View className='flex-row items-center px-5 py-2 rounded-full bg-dark-200'>
      <Image
        source={icons.search}
        className='w-5 h-5'
        resizeMode='contain'
        tintColor='#AB8BFF'
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className='flex-1 ml-2 text-white'
        placeholderTextColor='#A8B5DB'
      />
    </View>
  );
};

export default SearchBar;
