import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme } from 'native-base';
import HomeScreen from './screens/home/HomeScreen';
import KomikDetailScreen from './screens/contents/KomikDetailScreen';
import komikChapterSceen from './screens/contents/KomikChapterScreen';
import Setting from './screens/setting/Setting';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Dashboard from './screens/user/Dashboard';
import { useEffect, useState } from 'react';
import { auth } from './firebase/firebaseConfig';
import About from './screens/setting/About';
import Account from './screens/setting/Account';
import HelpAndSupport from './screens/setting/HelpAndSupport';
import Favorite from './screens/user/Favorite';
import History from './screens/user/History';
import AdvanceSearch from './screens/contents/AdvanceSeach';

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

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);


  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='home'>
          {user ?
            <>
              <Stack.Screen
                name='dashboard'
                component={Dashboard}
                options={{
                  animation: 'slide_from_right',
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='account'
                component={Account}
                options={{
                  animation: 'slide_from_right',
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='favorite'
                component={Favorite}
                options={{
                  animation: 'slide_from_left',
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='history'
                component={History}
                options={{
                  animation: 'slide_from_left',
                  headerShown: false
                }}
              />
            </> : <>
              <Stack.Screen
                name='login'
                component={Login}
                options={{
                  animation: 'slide_from_right',
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='register'
                component={Register}
                options={{
                  animation: 'slide_from_right',
                  headerShown: false
                }}
              />
            </>
          }
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
          <Stack.Screen
            name='about'
            component={About}
            options={{
              animation: 'slide_from_right',
              headerShown: false
            }}
          />
          <Stack.Screen
            name='helpAndSupport'
            component={HelpAndSupport}
            options={{
              animation: 'slide_from_right',
              headerShown: false
            }}
          />
          <Stack.Screen
            name='advanceSearch'
            component={AdvanceSearch}
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