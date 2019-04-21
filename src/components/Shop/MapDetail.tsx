import * as React from 'react';
import {
  StyleSheet,
  Modal,
  TouchableHighlight,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  toggleMapModal: () => void;
}

const MapDetail = ({ visible, toggleMapModal }: Props) => {
  return (
    <Modal
      animationType="slide"
      onRequestClose={toggleMapModal}
      visible={visible}
    >
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <View
          style={{
            height: 80,
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: 'white',
          }}
        >
          <Text style={{ fontSize: 25, marginTop: 35 }}>SampleTitle</Text>
          <TouchableHighlight
            onPress={toggleMapModal}
            style={{ marginTop: 35 }}
          >
            <Ionicons name="ios-close" size={40} />
          </TouchableHighlight>
        </View>
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
      </MapView>
    </Modal>
  );
};

export default MapDetail;
