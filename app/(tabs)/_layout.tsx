import TabIcon from '@/components/TabIcon';
import { icons } from '@/constants/icons';
import { Tabs } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        },
        tabBarStyle: {
          backgroundColor: '#191632',
          borderRadius: 50,
          marginHorizontal: 30,
          marginBottom: 36,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#191632'
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Trang chủ',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.home}
              title='Trang chủ'
            />
          )
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Tìm kiếm',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.search}
              title='Tìm kiếm'
            />
          )
        }}
      />
    </Tabs>
  );
};

export default _layout;
