import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const ShopEntry = ({ navigation }: Props) => {
  return (
    <TouchableOpacity
      style={{ height: 250 }}
      onPress={() => navigation.navigate('ShopDetail')}
    >
      <Image
        source={{
          uri:
            'https://www.salonpricelady.com/wp-content/uploads/2016/02/hair-salon-inside.jpg',
        }}
        style={{ flex: 3 }}
      />
      <View style={styles.textContainer}>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 19 }}>리차드 프로</Text>
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
