import { Location, Permissions } from "expo";

export const getCurrentLocation = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    console.log("Permission to access location was denied");
  }

  let location = await Location.getCurrentPositionAsync({
    accuracy: 0,
  });
  return location;
};
