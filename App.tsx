import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Start } from './src/screens/Start';
import { Home } from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Play_400Regular, Play_700Bold } from '@expo-google-fonts/play';
import { Details } from './src/screens/Details';
import { ButtonBack } from './src/components/ButtonBack';

import { LikesContext } from './src/contexts/context';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Home: undefined;
  Starts: undefined;
  Feed: { sort: 'latest' | 'top' } | undefined;
  Details: { id: string }
};
const RootStack = createNativeStackNavigator<RootStackParamList>()

function App() {


  const [fontLoaded] = useFonts({
    Play_400Regular,
    Play_700Bold
  })
  if (!fontLoaded) {
    return <AppLoading />
  }
  return (

    <NavigationContainer>
      <RootStack.Navigator>
        <Stack.Screen
          name="Start"
          component={Start}
          options={{
            title: 'Welcome',
            headerShown: false,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Welcome',
            headerShown: false,
            headerTransparent: true,

          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerTitle: () => null,
            headerShown: true,
            headerTransparent: true,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>

  );
}

export default () => {
  const [likes, setLikes] = useState<string[]>([])
  return (
    <LikesContext.Provider value={[likes, setLikes]}>
      <App />
    </LikesContext.Provider>
  );
}