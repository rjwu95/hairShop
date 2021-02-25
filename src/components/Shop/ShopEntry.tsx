import * as React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Shop } from "../../reducers/shopSlice";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  data: Shop;
  recentRegion: string;
}

const ShopEntry = ({ navigation, data, recentRegion }: Props) => {
  return (
    <TouchableOpacity
      style={{
        height: data.image[0] ? 250 : 250 / 3,
        borderBottomColor: "#dcdcdc",
        borderBottomWidth: 0.5,
      }}
      onPress={() =>
        navigation.navigate("ShopDetail", {
          data,
        })
      }
    >
      {data.image[0] && (
        <Image
          source={{
            uri: data.image[0],
          }}
          style={{ flex: 3 }}
        />
      )}
      <View style={styles.textContainer}>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 19 }}>{data.name}</Text>
          <Text style={{ fontSize: 13, color: "#a9a9a9" }}>
            {recentRegion.split(" ")[recentRegion.split(" ").length - 1]}
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          {data.menu && Object.keys(data.menu)[0] ? (
            <>
              <Text style={{ fontSize: 12, color: "#fe6067" }}>컷트</Text>
              <Text style={{ fontSize: 18, color: "#fe6067" }}>{`${
                data.menu[Object.keys(data.menu)[0]][0].price
              } ~ `}</Text>
            </>
          ) : (
            <Text style={{ fontSize: 18, color: "#fe6067" }}>
              가격정보 없음
            </Text>
          )}
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
