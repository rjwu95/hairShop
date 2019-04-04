import * as React from 'react';
import { Modal, TouchableHighlight, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { toggleAddressModal } from '../../actions';
import { AppState } from '../../store';
import { connect } from 'react-redux';

interface Props {
  toggleAddressModal: typeof toggleAddressModal;
  addressModalVisible: boolean;
}

const AddressModal = (props: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.addressModalVisible}
      onRequestClose={props.toggleAddressModal}
    >
      <View style={styles.closeContainer}>
        <TouchableHighlight onPress={props.toggleAddressModal}>
          <Ionicons name="ios-close" size={40} />
        </TouchableHighlight>
      </View>
    </Modal>
  );
};

const mapStateToProps = (state: AppState) => (
  state.address, state.addressModalVisible
);

export default connect(
  mapStateToProps,
  { toggleAddressModal },
)(AddressModal);

const styles = StyleSheet.create({
  closeContainer: {
    margin: 28,
    alignItems: 'flex-end',
  },
});
