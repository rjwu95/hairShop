import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Shop } from '../../reducers/types';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  data: Shop;
}

const ShopEntry = ({ navigation, data }: Props) => {
  return (
    <TouchableOpacity
      style={{ height: 250 }}
      onPress={() =>
        navigation.navigate('ShopDetail', {
          data,
        })
      }
    >
      <Image
        source={{
          uri: data.image[0],
        }}
        style={{ flex: 3 }}
      />
      <View style={styles.textContainer}>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 19 }}>{data.name}</Text>
          <Text style={{ fontSize: 13, color: '#a9a9a9' }}>
            응암/연신내 | 1.4km이내
          </Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 12, color: '#fe6067' }}>컷트</Text>
          <Text style={{ fontSize: 18, color: '#fe6067' }}>12,000원 ~ </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ShopEntry;

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
