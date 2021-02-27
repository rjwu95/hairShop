import * as React from "react";
import {
  Modal,
  TouchableHighlight,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import region from "./region.json";
import { changeMode } from "../../reducers/modeSlice";
import { toggleAddressModal } from "../../reducers/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import * as shopAPI from "../../apis/shopAPI";

const convertedCity = {
  서울특별시: "서울",
  경기도: "경기",
  부산광역시: "부산",
  대구광역시: "대구",
  인천광역시: "인천",
  광주광역시: "광주",
  대전광역시: "대전",
  울산광역시: "울산",
  강원도: "강원",
  충청북도: "충북",
  충청남도: "충남",
  전라북도: "전북",
  전라남도: "전남",
  경상북도: "경북",
  경상남도: "경남",
  제주특별자치도: "제주",
  세종특별자치시: "충남 세종",
};

const { height } = Dimensions.get("window");

interface Props {
  recentRegion: string;
  getShopRequest: () => void;
  tab: string;
  handleTab: (tab: string) => void;
}

const AddressModal = (props: Props) => {
  const address = useSelector((state: RootState) => state.address);
  const dispatch = useDispatch();
  const selectRegion = async (target: string) => {
    dispatch(changeMode("region"));
    const newRegion = props.tab + ` ${target}`;
    await AsyncStorage.setItem("recentRegion", newRegion);
    props.getShopRequest();
    toggleModal();
  };

  const handleCurrentButton = async () => {
    dispatch(changeMode("current"));
    const convertLocation = await shopAPI.fetchConvertLocation();
    let convertLocationArr = convertLocation.data.split(" ");
    convertLocationArr[0] = convertedCity[convertLocationArr[0]];
    await AsyncStorage.setItem("recentRegion", convertLocationArr.join(" "));
    props.getShopRequest();
    toggleModal();
  };

  const toggleModal = () => dispatch(toggleAddressModal());

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={address.modal}
      onRequestClose={toggleModal}
    >
      <View style={styles.header}>
        <Text style={{ fontSize: 22, fontWeight: "600" }}>지역 선택</Text>
        <TouchableHighlight
          onPress={toggleModal}
          style={{ width: 80, alignItems: "flex-end" }}
        >
          <Ionicons name="ios-close" size={40} />
        </TouchableHighlight>
      </View>
      <TouchableOpacity
        style={{
          height: 70,
          borderBottomWidth: 8,
          borderBottomColor: "#dcdcdc",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
        onPress={handleCurrentButton}
      >
        <Text style={{ fontSize: 18 }}>
          <Ionicons name="ios-locate" size={20} />
          {`  현재 내 주변 기준으로 보기`}
        </Text>
      </TouchableOpacity>
      <View style={{ height: height - 150, flexDirection: "row" }}>
        <View
          style={{
            width: "34%",
            borderRightColor: "#dcdcdc",
            borderRightWidth: 0.5,
          }}
        >
          {
            <FlatList
              style={{ height: "100%" }}
              data={region.map((el) => el.city)}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#dcdcdc",
                    backgroundColor:
                      item === props.tab ? "white" : "rgba(225,225,225, 0.6)",
                  }}
                  onPress={() => props.handleTab(item)}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: item === props.tab ? "black" : "#a9a9a9",
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          }
        </View>
        <View style={{ width: "66%", paddingHorizontal: 10 }}>
          {
            <FlatList
              style={{ height: "100%", paddingHorizontal: 10 }}
              data={region.filter((el) => el.city === props.tab)[0].state}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    height: 50,
                    justifyContent: "center",
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#dcdcdc",
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

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dcdcdc",
    paddingTop: 30,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AddressModal;
