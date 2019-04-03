import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppState } from './src/store';
import { connect, Provider } from 'react-redux';

import store from './src/store';
import { ShopState } from './src/reducers';
import { getShop } from './src/actions';

interface AppProps {
  getShop: typeof getShop;
  shop: ShopState;
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text>im text</Text>
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
  },
});
