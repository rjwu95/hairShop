import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  NavigationScreenProp,
  FlatList,
} from 'react-navigation';
// import { Ionicons } from '@expo/vector-icons';
import AddressModal from './AddressModal';
import { toggleAddressModal } from '../../actions';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import ShopEntry from './ShopEntry';

const fakedata = [1, 2, 3];

interface Props {
  toggleAddressModal: typeof toggleAddressModal;
  navigation: NavigationScreenProp<any, any>;
}

interface localState {
  isLoaded: boolean;
  modalVisible: boolean;
}

class Shop extends React.Component<Props, localState> {
  static navigationOptions = ({ navigation }: Props) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <TouchableOpacity onPress={params.toggleModal}>
          <Text style={{ fontSize: 15 }}>주소</Text>
        </TouchableOpacity>
      ),
    };
  };

  state: localState = {
    isLoaded: false,
    modalVisible: false,
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    navigation.setParams({
      toggleModal: this.props.toggleAddressModal,
    });
    this.setState({ isLoaded: true });
  };

  render() {
    return this.state.isLoaded ? (
      <>
        <AddressModal />
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <FlatList
              style={{ flex: 1 }}
              data={fakedata}
              keyExtractor={item => item.toString()}
              renderItem={() => <ShopEntry />}
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
  shop: state.shop,
  address: state.address,
  addressModalVisible: state.addressModalVisible,
});

const Connect = connect(
  mapStateToProps,
  { toggleAddressModal },
)(Shop);

export default createStackNavigator({ Connect });

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
