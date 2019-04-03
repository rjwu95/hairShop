import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AppState } from './src/store';
import { connect, Provider } from 'react-redux';

import store from './src/store';
import { State } from './src/reducers';
import { getShop } from './src/actions';

interface AppProps {
  getShop: typeof getShop;
  shop: State;
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.font}>현위치로 찾기</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.font}>검색으로 찾기</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  shop: state.shop,
});

const Content = connect(
  mapStateToProps,
  { getShop },
)(App);

const AppContainer = () => (
  <Provider store={store}>
    <Content />
  </Provider>
);

export default AppContainer;

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
