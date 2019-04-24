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
import { toggleAddressModal } from '../../actions';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import region from './region.json';

const { height } = Dimensions.get('window');

interface Props {
  toggleAddressModal: typeof toggleAddressModal;
  addressModalVisible: boolean;
  recentRegion: string;
  getShopRequest: () => void;
}

const AddressModal = (props: Props) => {
  const selectRegion = async (target: string) => {
    const newRegion =
      region.filter(el => el.state.includes(target))[0].city + ` ${target}`;
    await AsyncStorage.setItem('recentRegion', newRegion);
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
                  }}
                >
                  <Text style={{ fontSize: 17 }}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          }
        </View>
        <View style={{ width: '66%', paddingHorizontal: 10 }}>
          {
            <FlatList
              style={{ height: '100%', paddingHorizontal: 10 }}
              data={
                region.filter(el =>
                  el.city.match(props.recentRegion.slice(0, 2)),
                )[0].state
              }
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
  { toggleAddressModal },
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
