import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useLanguage} from './src/hooks/useLanguage';
import Home from './src/components/Home';
import Game from './src/components/Game';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();
StatusBar.setHidden(true);

export default function App() {
  const [language, loading] = useLanguage();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  return (
    !loading && (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{gestureEnabled: false}}
          headerMode="none"
          mode="modal">
          <Stack.Screen
            name="Home"
            component={Home}
            initialParams={{language}}
          />
          <Stack.Screen
            name="Game"
            component={Game}
            initialParams={{language}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}
