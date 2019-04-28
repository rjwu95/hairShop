import * as React from 'react';
import {
  Modal,
  TouchableHighlight,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { toggleAddressModal, getShop, changeMode } from '../../actions';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import region from './region.json';
import axios from 'axios';
import { serverUrl } from '../../../config.json';
import { Constants, Location, Permissions } from 'expo';
// import axios from 'axios';
// import { serverUrl } from '../../../config.json';

const convertedCity = {
  서울특별시: '서울',
  경기도: '경기',
  부산광역시: '부산',
  대구광역시: '대구',
  인천광역시: '인천',
  광주광역시: '광주',
  대전광역시: '대전',
  울산광역시: '울산',
  강원도: '강원',
  충청북도: '충북',
  충청남도: '충남',
  전라북도: '전북',
  전라남도: '전남',
  경상북도: '경북',
  경상남도: '경남',
  제주특별자치도: '제주',
  세종특별자치시: '충남 세종',
};

const { height } = Dimensions.get('window');

interface Props {
  toggleAddressModal: typeof toggleAddressModal;
  addressModalVisible: boolean;
  recentRegion: string;
  getShopRequest: () => void;
  tab: string;
  handleTab: (tab: string) => void;
  getShop: typeof getShop;
  changeMode: typeof changeMode;
}

const AddressModal = (props: Props) => {
  const selectRegion = async (target: string) => {
    props.changeMode('region');
    const newRegion = props.tab + ` ${target}`;
    await AsyncStorage.setItem('recentRegion', newRegion);
    props.getShopRequest();
    props.toggleAddressModal();
  };

  const getCurrentLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: 0,
    });
    return location;
  };

  const handleCurrentButton = async () => {
    props.changeMode('current');
    const currentLocation = await getCurrentLocation();
    const convertLocation = await axios.get(
      `${serverUrl}/api/shop/convertLocation`,
      {
        headers: {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        },
      },
    );
    let convertLocationArr = convertLocation.data.split(' ');
    convertLocationArr[0] = convertedCity[convertLocationArr[0]];
    await AsyncStorage.setItem('recentRegion', convertLocationArr.join(' '));
    props.getShopRequest();
    props.toggleAddressModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.addressModalVisible}
      onRequestClose={props.toggleAddressModal}
    >
      <View style={styles.header}>
        <Text style={{ fontSize: 22, fontWeight: '600' }}>지역 선택</Text>
        <TouchableHighlight
          onPress={props.toggleAddressModal}
          style={{ width: 80, alignItems: 'flex-end' }}
        >
          <Ionicons name="ios-close" size={40} />
        </TouchableHighlight>
      </View>
      <TouchableOpacity
        style={{
          height: 70,
          borderBottomWidth: 8,
          borderBottomColor: '#dcdcdc',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}
        onPress={handleCurrentButton}
      >
        <Text style={{ fontSize: 18 }}>
          <Ionicons name="ios-locate" size={20} />
          {`  현재 내 주변 기준으로 보기`}
        </Text>
      </TouchableOpacity>
      <View style={{ height: height - 150, flexDirection: 'row' }}>
        <View
          style={{
            width: '34%',
            borderRightColor: '#dcdcdc',
            borderRightWidth: 0.5,
          }}
        >
          {
            <FlatList
              style={{ height: '100%' }}
              data={region.map(el => el.city)}
              keyExtractor={item => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#dcdcdc',
                    backgroundColor:
                      item === props.tab ? 'white' : 'rgba(225,225,225, 0.6)',
                  }}
                  onPress={() => props.handleTab(item)}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: item === props.tab ? 'black' : '#a9a9a9',
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          }
        </View>
        <View style={{ width: '66%', paddingHorizontal: 10 }}>
          {
            <FlatList
              style={{ height: '100%', paddingHorizontal: 10 }}
              data={region.filter(el => el.city === props.tab)[0].state}
              keyExtractor={item => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    height: 50,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#dcdcdc',
                  }}
                  onPress={() => selectRegion(item)}
                >
                  <Text style={{ fontSize: 17 }}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          }
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = (state: AppState) => ({
  address: state.shopReducer.address,
  addressModalVisible: state.shopReducer.addressModalVisible,
});

export default connect(
  mapStateToProps,
  { toggleAddressModal, getShop, changeMode },
)(AddressModal);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dcdcdc',
    paddingTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
