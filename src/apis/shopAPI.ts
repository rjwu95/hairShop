import { getCurrentLocation } from "../utils";
import instance from "./index";

export const fetchByRegion = (region: string) => {
  return instance.get(`/api/shop/getShops/${region}`);
};

export const fetchByLocation = async () => {
  const currentLocation = await getCurrentLocation();
  return instance.get(`/api/shop/currentLocation`, {
    headers: {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    },
  });
};

export const fetchConvertLocation = async () => {
  const currentLocation = await getCurrentLocation();
  return instance.get(`/api/shop/convertLocation`, {
    headers: {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    },
  });
};
