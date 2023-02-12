import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemeProvider } from '@shopify/restyle';
import theme from './ScoutDesign/library/theme';
import { useFonts } from 'expo-font';

import { ActivityIndicator, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from './src/modules/auth/SignUp';

import { ApolloProvider, useQuery } from '@apollo/client';

import { ScoutTrekApolloClient, GET_INITIAL_USER_FIELDS } from 'data';

import AuthNavigator from './src/modules/navigation/AuthNavigator';
import MainStackNavigator from './src/modules/navigation/MainStackNavigator';

export type AppStackParamList = {
  AuthNav: undefined;
  Home: { newUser: boolean };
};

const Stack = createStackNavigator<AppStackParamList>();

const AppLoadingContainer = () => {
  const [token, setToken] = useState<string>('');
  const [newUser, setNewUser] = useState<boolean>(false);

  useQuery(GET_INITIAL_USER_FIELDS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data) {
        try {
          AsyncStorage.getItem('userToken').then((token) => {
            if (token) {
              setToken(token);
              setNewUser(!data.currUser || data.currUser.noGroups);
            }
            setAppLoading(false);
          });
        } catch (e) {
          console.log(e);
        }
      }
    },
    onError: ({ graphQLErrors }) => {
      graphQLErrors.forEach((err) => {
        if (err.extensions.code === 'UNAUTHORIZED') {
          setNewUser(true);
          setAppLoading(false);
        }
      });
    },
  });
  const [appLoading, setAppLoading] = useState<boolean>(true);

  const [fontsLoaded] = useFonts({
    'open-sans-bold': require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
    'open-sans-semibold': require('./assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
    'open-sans-regular': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    'open-sans-light': require('./assets/fonts/OpenSans/OpenSans-Light.ttf'),
    'metropolis-black': require('./assets/fonts/metropolis/Metropolis-Black.otf'),
    'metropolis-bold': require('./assets/fonts/metropolis/Metropolis-Bold.otf'),
    'metropolis-medium': require('./assets/fonts/metropolis/Metropolis-Medium.otf'),
    'metropolis-regular': require('./assets/fonts/metropolis/Metropolis-Regular.otf'),
    'metropolis-light': require('./assets/fonts/metropolis/Metropolis-Light.otf'),
  });

  if (!fontsLoaded || appLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );

  return (
    <AuthContext.Provider value={{ token, setToken, newUser, setNewUser }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
          })}
        >
          {!token ? (
            <Stack.Screen
              name="AuthNav"
              component={AuthNavigator}
              options={{
                animationTypeForReplace: 'push',
              }}
            />
          ) : (
            <Stack.Screen
              name="Home"
              component={MainStackNavigator}
              initialParams={{
                newUser,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default function App() {
  return (
    <ApolloProvider client={ScoutTrekApolloClient}>
      <ThemeProvider theme={theme}>
        <AppLoadingContainer />
      </ThemeProvider>
    </ApolloProvider>
  );
}
