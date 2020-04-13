import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/components/Home';
import Game from './src/components/Game';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();
StatusBar.setHidden(true);

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{gestureEnabled: false}}
        headerMode="none"
        mode="modal">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
