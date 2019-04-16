import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import {
  createStackNavigator,
  NavigationScreenProp,
  FlatList,
} from 'react-navigation';
// import { Ionicons } from '@expo/vector-icons';
import AddressModal from './AddressModal';
import { Shop } from '../../reducers/types';
import { toggleAddressModal, getShop } from '../../actions';
import { connect } from 'react-redux';
import ShopEntry from './ShopEntry';
import ShopDetail from './ShopDetail';
import axios from 'axios';
import { serverUrl } from '../../../config.json';
import { AppState } from '../../store';

interface Props {
  toggleAddressModal: typeof toggleAddressModal;
  navigation: NavigationScreenProp<any, any>;
  shops: Shop[];
  getShop: typeof getShop;
}

interface localState {
  isLoaded: boolean;
  modalVisible: boolean;
  page: number;
}

class ShopScreen extends React.Component<Props, localState> {
  static navigationOptions = ({ navigation }: Props) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <TouchableOpacity onPress={params.toggleModal}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>주소</Text>
        </TouchableOpacity>
      ),
    };
  };

  state: localState = {
    isLoaded: false,
    modalVisible: false,
    page: 1,
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    navigation.setParams({
      toggleModal: this.props.toggleAddressModal,
    });
    await this.getShopRequest();
    this.setState({ isLoaded: true });
  };

  getShopRequest = async () => {
    let recentRegion =
      (await AsyncStorage.getItem('recentRegion')) || '서울 강남구';
    let shopResult = await axios.get(
      encodeURI(`${serverUrl}/api/shop/getShops/${recentRegion}`),
    );
    this.props.getShop([...shopResult.data]);
  };

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  render() {
    return this.state.isLoaded ? (
      <>
        <AddressModal />
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <FlatList
              style={{ flex: 1 }}
              data={this.props.shops.slice(0, this.state.page * 10)}
              keyExtractor={item => item._id.toString()}
              renderItem={({ item }) => (
                <ShopEntry navigation={this.props.navigation} data={item} />
              )}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0}
            />
          </View>
        </View>
      </>
    ) : (
      <Text>loding</Text>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  shops: state.shopReducer.shops,
  address: state.shopReducer.address,
  addressModalVisible: state.shopReducer.addressModalVisible,
});

const Connect = connect(
  mapStateToProps,
  { toggleAddressModal, getShop },
)(ShopScreen);

export default createStackNavigator({
  Connect,
  ShopDetail,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#DB7093',
    margin: 10,
    justifyContent: 'center',
    height: '15%',
    padding: 10,
  },
  font: { color: 'white', fontWeight: '700' },
});
