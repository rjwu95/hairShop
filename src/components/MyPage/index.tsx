import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const MyPage = () => {
  return (
    <View>
      <Text>MyPage page</Text>
    </View>
  );
};

export default createStackNavigator({ MyPage });
