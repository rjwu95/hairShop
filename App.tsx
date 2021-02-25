import * as React from "react";
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Provider } from "react-redux";
// import { Ionicons } from '@expo/vector-icons';

import store from "./src/store";
// import { State } from './src/reducers';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Shop from "./src/components/Shop";
// import MyPage from './src/components/MyPage';

// interface AppProps {
//   getShop: typeof getShop;
//   shop: State;
// }

// interface tabBar {
//   tintColor: string;
// }

// const Root = createBottomTabNavigator({
//   Shop: {
//     screen: Shop,
//     navigationOptions: {
//       tabBarLable: '헤어샵',
//       tabBarIcon: ({ tintColor }: tabBar) => (
//         <Ionicons name="ios-home" size={24} color={tintColor} />
//       ),
//     },
//   },
//   MyPage: {
//     screen: MyPage,
//     navigationOptions: {
//       tabBarLable: '마이',
//       tabBarIcon: ({ tintColor }: tabBar) => {
//         return <Ionicons name="ios-person" size={24} color={tintColor} />;
//       },
//     },
//   },
// });

const AppContainer = createAppContainer(Shop);

interface State {
  isFontLoded: Boolean;
}

class App extends React.Component<State> {
  state: State = {
    isFontLoded: false,
  };

  // async componentWillMount() {
  //   await Font.loadAsync({
  //     Ionicons: require('react-native-vector-icons/Fonts'),
  //   });
  // }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
