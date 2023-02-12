import {
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';
import { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApolloClient } from '@apollo/client';

import {
  initialState,
  createEventFormReducer,
} from '../createEvent/createEventForm/createEventFormReducer';
import { CreateEventFormProvider } from '../createEvent/createEventForm/CreateEventFormStore';

import JoinGroupNavigator from './JoinGroupNavigator';
import ViewEvent from '../viewEvent/ViewEvent';
import CreateEvent from './CreateEventNavigator';
import MainTabNavigator from './MainTabNavigator';
import Notifications from '../notifications/Notifications';
import { AuthContext } from '../auth/SignUp';
import { AppStackParamList } from 'App';

export type MainStackParamList = {
  JoinGroup: undefined;
  Notifications: undefined;
  Main: undefined;
  CreateEvent: {
    screen: string;
    params: { type: string; id: number; update: boolean };
  };
  ViewEvent: { currItem: any };
};

const MainStack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = ({
  route,
}: StackScreenProps<AppStackParamList, 'Home'>) => {
  // const client = useApolloClient();
  // const {setToken} = useContext(AuthContext);
  // useEffect(() => {
  //   AsyncStorage.removeItem('userToken');
  //   AsyncStorage.removeItem('currMembershipID');
  //   setToken('');
  //   client.stop();
  //   client.clearStore();
  // }, []);

  return (
    <CreateEventFormProvider
      initialState={initialState}
      reducer={createEventFormReducer}
    >
      <MainStack.Navigator
        initialRouteName={route?.params?.newUser ? 'JoinGroup' : 'Main'}
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <MainStack.Screen name="JoinGroup" component={JoinGroupNavigator} />
        <MainStack.Screen name="Notifications" component={Notifications} />
        <MainStack.Screen name="Main" component={MainTabNavigator} />
        <MainStack.Screen name="CreateEvent" component={CreateEvent} />
        <MainStack.Screen name="ViewEvent" component={ViewEvent} />
      </MainStack.Navigator>
    </CreateEventFormProvider>
  );
};

export default MainStackNavigator;
