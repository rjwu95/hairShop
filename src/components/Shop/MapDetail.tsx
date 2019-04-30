import * as React from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Shop } from '../../reducers/types';

const { height } = Dimensions.get('window');

interface Props {
  visible: boolean;
  toggleMapModal: () => void;
  shops: Shop[];
}

const MapDetail = ({ visible, toggleMapModal, shops }: Props) => {
  return (
    <Modal
      animationType="slide"
      onRequestClose={toggleMapModal}
      visible={visible}
    >
      <View
        style={{
          height: 75,
          paddingHorizontal: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 25,
          alignItems: 'center',
          backgroundColor: 'white',
          borderBottomColor: '#dcdcdc',
          borderBottomWidth: 0.5,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '500' }}>{shops[0].name}</Text>
        <TouchableOpacity
          onPress={toggleMapModal}
          style={{
            width: 80,
            alignItems: 'flex-end',
          }}
        >
          <Ionicons name="ios-close" size={30} />
        </TouchableOpacity>
      </View>
      <MapView
        style={{ height: height - 75 }}
        region={{
          latitude: shops[0].location.lat,
          longitude: shops[0].location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton={true}
      >
        {shops.map(el => (
          <Marker
            coordinate={{
              latitude: el.location.lat,
              longitude: el.location.lng,
            }}
            key={el._id.toString()}
          >
            <Callout>
              <Text>{el.name}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </Modal>
  );
};

export default MapDetail;
