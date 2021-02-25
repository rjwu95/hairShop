import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import MapDetail from './MapDetail';
import { Menu, Shop } from '../../reducers/shopSlice';

const { height } = Dimensions.get('window');
// const fakeData = [
//   'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=http%3A%2F%2Fldb.phinf.naver.net%2F20170927_131%2F1506500285267vCxjV_JPEG%2F6skIPrXmwT4jB2qxdWdnmuwj.jpg&type=m862_636',
//   'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=http%3A%2F%2Fldb.phinf.naver.net%2F20170927_131%2F1506500285267vCxjV_JPEG%2F6skIPrXmwT4jB2qxdWdnmuwj.jpg&type=m862_636',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Bg3AKtutxWUgBkEj8Z5H8GoSggtqmAI8FCs3c--uWf_Xlax-9w',
// ];

interface bannerProps {
  data: Shop;
}

const Banner = ({ data }: bannerProps) => (
  <Swiper
    style={{ height: 200 }}
    height={200}
    autoplayDirection={true}
    autoplayTimeout={3}
    autoplay
    showsPagination={false}
  >
    {data.image.length ? (
      data.image.map((el, i) => (
        <View
          key={i.toString()}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <ImageBackground
            source={{ uri: el }}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          />
        </View>
      ))
    ) : (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <ImageBackground
          source={require('../../../nonImage.jpg')}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        />
      </View>
    )}
  </Swiper>
);

const priceEntry = (menu: Menu) =>
  Object.keys(menu).map(el => (
    <View style={styles.categoryContainer} key={el}>
      <View style={{ height: 25, justifyContent: 'center' }}>
        <Text style={{ fontWeight: '600' }}>{el}</Text>
      </View>
      {menu[el].map((ele, i) => (
        <View style={styles.priceEntryInnerContainer} key={i.toString()}>
          <Text style={{ color: '#696969' }}>{`${ele.name.replace(
            '대표',
            '',
          )}  `}</Text>
          <Text style={{ color: '#dcdcdc' }}>-----------</Text>
          <Text style={{ color: '#696969', fontWeight: 'bold' }}>
            {`  ${ele.price}`}
          </Text>
        </View>
      ))}
    </View>
  ));

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  menuFullVisible: boolean;
  mapModalVisible: boolean;
}

class ShopDetail extends React.Component<Props, State, any> {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  state: State = {
    menuFullVisible: true,
    mapModalVisible: false,
  };

  handleCall = () => {
    const { contact } = this.props.navigation.getParam('data');
    if (contact) {
      return Linking.openURL(`tel:${contact}`);
    }
    return Alert.alert('등록된 전화번호가 없습니다');
  };

  calculateMenuSize = () => {
    if (!this.state.menuFullVisible) return 133;
    const { menu } = this.props.navigation.getParam('data');
    let total = 0;
    Object.keys(menu).forEach(el => {
      total += 25;
      total += menu[el].length * 20;
    });
    return total + 20;
  };

  toggleMapModal = () => {
    this.setState({
      mapModalVisible: !this.state.mapModalVisible,
    });
  };

  render() {
    const data: Shop = this.props.navigation.getParam('data');
    return (
      <>
        <MapDetail
          visible={this.state.mapModalVisible}
          toggleMapModal={this.toggleMapModal}
          shops={[data]}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{ position: 'absolute', left: 25, top: 25, zIndex: 1 }}
        >
          <Ionicons name="ios-arrow-dropleft-circle" color="white" size={40} />
        </TouchableOpacity>
        <HeaderImageScrollView
          maxHeight={200}
          minHeight={0}
          renderHeader={() => <Banner data={data} />}
        >
          <>
            <View>
              <View style={styles.titleContainer}>
                <View style={styles.titleInnerContainer}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                    {data.name}
                  </Text>
                </View>
              </View>
              {/* <View style={styles.reviewContainer}>
                <View style={styles.titleInnerContainer}>
                  <View style={styles.reviewTextContainer}>
                    <Text style={{ fontSize: 15, color: '#696969' }}>리뷰</Text>
                    <Text style={{ color: '#a9a9a9', fontSize: 15 }}>
                      전체보기 >
                    </Text>
                  </View>
                  <View style={styles.reviewImageContainer}>
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
              </View> */}
              {Object.keys(data.menu).length ? (
                <View style={styles.menuContainer}>
                  <Text style={styles.menuTitle}>메뉴 및 가격</Text>
                  <View
                    style={[
                      styles.dashBox,
                      { height: 170 + this.calculateMenuSize() },
                    ]}
                  >
                    <View style={styles.menuTitleContainer}>
                      <Text style={{ fontSize: 20 }}>{data.name}의</Text>
                      <Text style={{ fontSize: 20, fontWeight: '600' }}>
                        {`${data.menu[
                          Object.keys(data.menu)[0]
                        ][0].name.replace('대표', '')} 가격은`}
                      </Text>
                      <Text style={{ fontSize: 20, color: '#fe6067' }}>
                        {`${
                          data.menu[Object.keys(data.menu)[0]][0].price
                        } 입니다.`}
                      </Text>
                    </View>
                    <View style={styles.noticeContainer}>
                      <Text style={{ color: '#696969' }}>
                        *이 외의 다른 시술 시 금액이 변경될 수 있습니다.
                      </Text>
                      <Text style={{ color: '#696969' }}>
                        자세한 가격은 샵에 문의해주세요.
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.priceEntryContainer,
                        { height: this.calculateMenuSize() },
                      ]}
                    >
                      {priceEntry(data.menu)}
                    </View>
                  </View>
                </View>
              ) : null}
              {/* <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      menuFullVisible: !this.state.menuFullVisible,
                    })
                  }
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#a9a9a9',
                    borderStyle: 'dashed',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 35,
                  }}
                >
                  <Text style={{ fontSize: 15, color: '#a9a9a9' }}>
                    메뉴 펴기/접기
                  </Text>
                </TouchableOpacity> */}
              {data.address.length ||
              data.homepage ||
              data.openingHours.length ? (
                <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
                  <Text style={{ fontSize: 15, color: '#696969', height: 30 }}>
                    매장정보
                  </Text>
                  {data.address.length ? (
                    <TouchableOpacity
                      onPress={this.toggleMapModal}
                      style={{ height: 70, width: '100%' }}
                    >
                      <ImageBackground
                        style={{ width: '100%', height: '100%' }}
                        source={require('../../../mapBackground.png')}
                      >
                        <View style={styles.mapBackground}>
                          <View style={{ justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 15 }}>
                              {data.address[0]}
                            </Text>
                            <Text style={{ color: 'white', fontSize: 15 }}>
                              ({data.address[1]})
                            </Text>
                          </View>
                          <View style={{ justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, color: 'white' }}>
                              >
                            </Text>
                          </View>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  ) : null}
                  {data.contact ? (
                    <View style={styles.contactInfoContainer}>
                      <View
                        style={{
                          justifyContent: 'center',
                          width: 80,
                        }}
                      >
                        <Text style={styles.contactTitle}>전화번호</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => Linking.openURL(`tel:${data.contact}`)}
                        style={{
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={styles.contact}>{data.contact}</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  {data.openingHours.length ? (
                    <View style={styles.contactInfoContainer}>
                      <View
                        style={{
                          width: 80,
                        }}
                      >
                        <Text style={styles.contactTitle}>영업시간</Text>
                      </View>
                      <View style={{}}>
                        {data.openingHours.map(el => (
                          <Text key={el}>{el}</Text>
                        ))}
                      </View>
                    </View>
                  ) : null}
                  {data.homepage ? (
                    <View style={styles.contactInfoContainer}>
                      <View
                        style={{
                          width: 80,
                        }}
                      >
                        <Text style={styles.contactTitle}>홈페이지</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => Linking.openURL(data.homepage)}
                      >
                        <Text style={styles.contact}>{data.homepage}</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
            <View style={{ height: height * 0.12 }} />
          </>
        </HeaderImageScrollView>
        <View style={styles.callBoxContainer}>
          <TouchableOpacity style={styles.callBox} onPress={this.handleCall}>
            <Text style={{ fontSize: 18, color: 'white' }}>
              <Ionicons name="ios-call" size={20} />
              {`  전화문의`}
            </Text>
          </TouchableOpacity>
        </View>
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
  priceEntryContainer: {
    alignItems: 'center',
    width: '100%',
  },
  noticeContainer: {
    alignItems: 'center',
    height: 50,
    // justifyContent: 'center',
    width: '100%',
  },
  dashBox: {
    borderWidth: 0.5,
    borderColor: '#a9a9a9',
    borderStyle: 'dashed',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  menuTitleContainer: {
    alignItems: 'center',
    height: 126,
    justifyContent: 'center',
    width: '100%',
  },
  priceEntryInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 20,
  },
  reviewImageContainer: {
    height: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callBox: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  callBoxContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 1,
    width: '100%',
    height: '10%',
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    width: '100%',
  },
  mapBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  contactInfoContainer: {
    height: 70,
    flexDirection: 'row',
  },
  contactTitle: {
    fontSize: 16,
    color: '#696969',
  },
  contact: {
    textDecorationLine: 'underline',
    color: '#6495ed',
    fontSize: 14,
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  menuTitle: {
    fontSize: 15,
    height: 30,
    color: '#696969',
  },
});
