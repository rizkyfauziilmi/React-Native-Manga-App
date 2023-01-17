// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme } from 'native-base';
import HomeScreen from './screens/home/HomeScreen';
import KomikDetailScreen from './screens/contents/KomikDetailScreen';
import komikChapterSceen from './screens/contents/KomikChapterScreen';
import Setting from './screens/setting/Setting';

const Stack = createNativeStackNavigator();

function App() {
  const theme = extendTheme({
    components: {
      Heading: {
        baseStyle: (props) => {
          return {
            _light: { color: 'black' },
            _dark: { color: 'white' },
          };
        },
      },
      HStack: {
        baseStyle: (props) => {
          return {
            _light: { bg: 'white' },
            _dark: { bg: 'coolGray.800' },
          };
        },
      },
      VStack: {
        baseStyle: (props) => {
          return {
            _light: { bg: 'white' },
            _dark: { bg: 'coolGray.800' },
          };
        },
      },
      ScrollView: {
        baseStyle: (props) => {
          return {
            _light: { bg: 'white' },
            _dark: { bg: 'coolGray.800' },
          };
        },
      },
    },
    config: {
      initialColorMode: "dark",
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{
              animation: 'slide_from_right',
              headerShown: false
            }}
          />
          <Stack.Screen
            name='komikDetail'
            component={KomikDetailScreen}
            options={{
              animation: 'slide_from_right',
              headerShown: false
            }}
          />
          <Stack.Screen
            name='komikChapter'
            component={komikChapterSceen}
            options={{
              animation: 'slide_from_right',
              headerShown: false
            }}
          />
          <Stack.Screen
            name='setting'
            component={Setting}
            options={{
              animation: 'slide_from_right',
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;