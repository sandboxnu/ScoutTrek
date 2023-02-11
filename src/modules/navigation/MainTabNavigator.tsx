import { ActivityIndicator, Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../profile/ProfileScreen';
import CalendarScreen from '../calendar/CalendarView';

import { Icon, Text, Avatar, Container } from 'ScoutDesign/library';
import { home, calendar, notifications } from 'ScoutDesign/icons';

import UpcomingEvents from '../home/UpcomingEvents';
import { GET_CURR_USER } from 'data';
import { useQuery } from '@apollo/client';

const HomeStack = createStackNavigator();

const HomeNav = ({ navigation }) => {
  const { data, error, loading } = useQuery(GET_CURR_USER);

  if (error) {
    console.error(error);
    return null;
  }
  if (loading) return <ActivityIndicator />;
  return (
    <HomeStack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitle: () => (
          <Container paddingVertical="none">
            <Text weight="bold">ScoutTrek</Text>
          </Container>
        ),
        headerRight: () => (
          <Container paddingVertical="none">
            <Icon
              icon={notifications}
              color="darkGrey"
              size="m"
              onPress={() => navigation.navigate('Notifications')}
              // @todo this should be updated with a GQL subscription because it should change if the app is open when another user modifies an event.
              badge={!!data.currUser?.unreadNotifications?.length}
            />
          </Container>
        ),
      })}
    >
      <HomeStack.Screen name="Home" component={UpcomingEvents} />
    </HomeStack.Navigator>
  );
};

// Global Styles
const MainBottomTab = createBottomTabNavigator();

// Icons
const homeDark = require('../../../assets/images/tabbar/homeDark.png');
const calendarDark = require('../../../assets/images/tabbar/calendarDark.png');

const MainBottomTabNavigator = () => {
  const { data, error, loading } = useQuery(GET_CURR_USER);
  if (error) {
    console.error(error);
    return null;
  }
  if (loading) return <ActivityIndicator />;
  return (
    <MainBottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }: { focused: boolean }) => {
          const size = 23;
          switch (route.name) {
            case 'UpcomingEvents':
              return focused ? (
                <Image
                  source={homeDark}
                  style={{ width: size, height: size }}
                />
              ) : (
                <Icon icon={home} color="brandPrimary" size="m" />
              );
            case 'Calendar':
              return focused ? (
                <Image
                  source={calendarDark}
                  style={{ width: size, height: size }}
                />
              ) : (
                <Icon icon={calendar} color="interactiveDark" size="m" />
              );
            case 'Profile':
              return (
                <Avatar
                  border={focused}
                  size="m"
                  source={{
                    uri: data.currUser?.userPhoto,
                  }}
                />
              );
            default:
              return null;
          }
        },
      })}
    >
      <MainBottomTab.Screen
        options={{ tabBarLabel: 'Home' }}
        name="UpcomingEvents"
        component={HomeNav}
      />
      <MainBottomTab.Screen name="Calendar" component={CalendarScreen} />
      <MainBottomTab.Screen name="Profile" component={ProfileScreen} />
    </MainBottomTab.Navigator>
  );
};

export default MainBottomTabNavigator;
