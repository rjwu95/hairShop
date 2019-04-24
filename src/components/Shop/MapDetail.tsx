import * as React from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Shop } from '../../reducers/types';

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
      <MapView
        style={StyleSheet.absoluteFill}
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
        <View
          style={{
            height: 80,
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: 'blue',
            paddingTop: 35,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 25, backgroundColor: 'yellow' }}>
            SampleTitle
          </Text>
          <TouchableOpacity
            onPress={toggleMapModal}
            style={{ backgroundColor: 'brown' }}
          >
            <Text>
              <Ionicons
                name="ios-close"
                size={30}
                style={{ backgroundColor: 'red' }}
              />
            </Text>
          </TouchableOpacity>
        </View>
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
