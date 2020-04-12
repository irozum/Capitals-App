import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/components/Home';
import Game from './src/components/Game';
// import Menu from './src/components/Menu';
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();
StatusBar.setHidden(true);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{gestureEnabled: false}}
        headerMode="none"
        mode="modal">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Game" component={Game} />
        {/* <Stack.Screen name="Menu" component={Menu} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
