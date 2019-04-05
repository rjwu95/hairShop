import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

const fakeData = [
  'https://www.salonpricelady.com/wp-content/uploads/2016/02/hair-salon-inside.jpg',
  'http://www.hk-interiors.co.uk/images/srv/page-services/Gallery%20Pictures/Leisure%20Industry/Cutting%20Room/The%20Cutting%20Room%20Hair%20Salon%20%282%29.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Bg3AKtutxWUgBkEj8Z5H8GoSggtqmAI8FCs3c--uWf_Xlax-9w',
];

const Banner = () => (
  <Swiper
    style={{ height: 200 }}
    height={200}
    autoplayDirection={true}
    autoplayTimeout={3}
    autoplay
    showsPagination={false}
  >
    {fakeData.map((el, i) => (
      <View
        key={i.toString()}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'purple',
        }}
      >
        <Image
          source={{ uri: el }}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        />
      </View>
    ))}
  </Swiper>
);

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

class ShopDetail extends React.Component<Props> {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  render() {
    return (
      <>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{ position: 'absolute', left: 25, top: 25, zIndex: 1 }}
        >
          <Ionicons name="ios-arrow-round-back" color="black" size={45} />
        </TouchableOpacity>
        <HeaderImageScrollView
          maxHeight={200}
          minHeight={0}
          renderHeader={() => <Banner />}
          renderForeground={() => (
            <View
              style={{
                height: 150,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}
        >
          <View style={{ height: 1000 }}>
            <TriggeringView onHide={() => console.log('text hidden')}>
              <View style={styles.titleContainer}>
                <View style={styles.titleInnerContainer}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                    리차드 프로
                  </Text>
                </View>
              </View>
              <View style={styles.reviewContainer}>
                <View style={styles.titleInnerContainer}>
                  <View style={styles.reviewTextContainer}>
                    <Text style={{ fontSize: 15, color: '#696969' }}>리뷰</Text>
                    <Text style={{ color: '#a9a9a9', fontSize: 15 }}>
                      전체보기 >
                    </Text>
                  </View>
                  <View
                    style={{
                      height: '80%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={{ uri: fakeData[0] }}
                      style={{ width: 110, height: 110 }}
                    />
                    <Image
                      source={{ uri: fakeData[0] }}
                      style={{ width: 110, height: 110 }}
                    />
                    <Image
                      source={{ uri: fakeData[0] }}
                      style={{ width: 110, height: 110 }}
                    />
                  </View>
                </View>
              </View>
              <View style={{ height: 250, padding: 20 }}>
                <Text style={{ fontSize: 15, height: '15%', color: '#696969' }}>
                  메뉴 및 가격
                </Text>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#a9a9a9',
                    borderStyle: 'dashed',
                    height: '90%',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      height: '50%',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>리차드 헤어의</Text>
                    <Text style={{ fontSize: 20 }}>컷트 기본 가격은</Text>
                    <Text style={{ fontSize: 20, color: '#fe6067' }}>
                      12,000원 입니다.
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      height: '25%',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ color: '#696969' }}>
                      *이 외의 다른 시술 시 금액이 변경될 수 있습니다.
                    </Text>
                    <Text style={{ color: '#696969' }}>
                      자세한 가격은 샵에 문의해주세요.
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: '25%',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ color: '#696969' }}>컷트</Text>
                    <Text style={{ color: '#dcdcdc' }}>----------------</Text>
                    <Text style={{ color: '#696969', fontWeight: 'bold' }}>
                      12,000원
                    </Text>
                  </View>
                </View>
              </View>
              <View />
            </TriggeringView>
          </View>
        </HeaderImageScrollView>
      </>
    );
  }
}

export default ShopDetail;

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 70,
  },
  titleInnerContainer: {
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    height: '100%',
  },
  reviewContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 180,
  },
  reviewTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '20%',
  },
});
