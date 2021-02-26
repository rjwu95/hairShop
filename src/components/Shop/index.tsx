import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import {
  createStackNavigator,
  NavigationScreenProp,
  FlatList,
} from "react-navigation";
import AddressModal from "./AddressModal";
import ShopEntry from "./ShopEntry";
import ShopDetail from "./ShopDetail";
import { Ionicons } from "@expo/vector-icons";
import store from "../../store";
import { getShop } from "../../reducers/shopSlice";
import { toggleAddressModal } from "../../reducers/addressSlice";
import * as shopAPI from "../../apis/shopAPI";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  mode: string;
}

interface localState {
  isLoaded: boolean;
  modalVisible: boolean;
  page: number;
  recentRegion: string;
  tab: string;
}

class ShopScreen extends React.Component<Props, localState> {
  static navigationOptions = ({ navigation }: Props) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <TouchableOpacity
          onPress={params.toggleModal}
          style={styles.headerTitle}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            <Ionicons name="ios-pin" size={14} />
            {`  ${params.recentRegion}  `}
            <Ionicons name="ios-arrow-down" size={14} />
          </Text>
        </TouchableOpacity>
      ),
    };
  };

  state: localState = {
    isLoaded: false,
    modalVisible: false,
    page: 1,
    recentRegion: "",
    tab: "",
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    navigation.setParams({
      toggleModal: () => store.dispatch(toggleAddressModal()),
    });
    await this.getShopRequest();
    this.setState({ isLoaded: true });
  };

  getShopRequest = async () => {
    this.setState({ isLoaded: false });
    const { navigation } = this.props;
    let recentRegion =
      (await AsyncStorage.getItem("recentRegion")) || "서울 강남구";
    await this.setState({
      recentRegion,
    });
    await navigation.setParams({
      recentRegion,
    });
    let shopResult;
    if (store.getState().mode.value === "region") {
      shopResult = await shopAPI.fetchByRegion(recentRegion);
    } else {
      shopResult = await shopAPI.fetchByLocation();
    }
    store.dispatch(getShop([...shopResult.data]));
    this.setState({
      tab: recentRegion.slice(0, 2),
    });
    this.setState({ isLoaded: true });
  };

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  handleTab = async (tab: string) => {
    this.setState({
      tab,
    });
  };

  render() {
    return this.state.isLoaded ? (
      <>
        <AddressModal
          recentRegion={this.state.recentRegion}
          getShopRequest={this.getShopRequest}
          tab={this.state.tab}
          handleTab={this.handleTab}
        />
        {store.getState().shop.value.length === 0 ? (
          <Text>해당 지역에 미용실 정보가 없습니다.</Text>
        ) : (
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              <FlatList
                style={{ flex: 1 }}
                data={store
                  .getState()
                  .shop.value.slice(0, this.state.page * 10)}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                  <ShopEntry
                    navigation={this.props.navigation}
                    data={item}
                    recentRegion={this.state.recentRegion}
                  />
                )}
                onEndReached={this.handleLoadMore}
              />
            </View>
          </View>
        )}
      </>
    ) : (
      <Text>...loading</Text>
    );
  }
}

export default createStackNavigator({
  ShopScreen,
  ShopDetail,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#DB7093",
    margin: 10,
    justifyContent: "center",
    height: "15%",
    padding: 10,
  },
  font: { color: "white", fontWeight: "700" },
  headerTitle: {
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
