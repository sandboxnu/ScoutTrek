import { useRef, useEffect } from 'react';
import { SectionList, Platform } from 'react-native';
import EventCard from './components/EventCard';
import NoEvents from '../../components/NoEvents';
import * as Device from 'expo-device';
import { plusThin } from 'ScoutDesign/icons';
import { Container, LargeFloatingButton, Text } from 'ScoutDesign/library';
import { GET_CURR_USER, GET_EVENTS } from 'data';

import * as Notifications from 'expo-notifications';
import { gql, useMutation, useQuery } from '@apollo/client';

import { DISMISS_NOTIFICATION } from '../notifications/Notifications';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  HomeStackParamList,
  MainBottomParamList,
} from '../navigation/MainTabNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/MainStackNavigator';

export const UPDATE_EXPO_TOKEN = gql`
  mutation UpdateExpoToken($token: UpdateUserInput!) {
    updateCurrUser(input: $token) {
      id
    }
  }
`;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export type EventSignature = {
  id: string;
  type: Event;
};

type UpcomingEventsProp = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, 'Home'>,
  CompositeScreenProps<
    BottomTabScreenProps<MainBottomParamList>,
    StackScreenProps<MainStackParamList>
  >
>;

export default function UpcomingEvents({ navigation }: UpcomingEventsProp) {
  const [dismissNotification] = useMutation(DISMISS_NOTIFICATION, {
    refetchQueries: [GET_CURR_USER],
  });

  const { loading, error, data } = useQuery(GET_EVENTS, {
    fetchPolicy: 'network-only',
  });

  const [updateToken] = useMutation(UPDATE_EXPO_TOKEN);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    (async () => {
      await registerForPushNotificationsAsync();
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const notificationType =
            response.notification.request.content.data.type;
          const notificationID =
            response.notification.request.content.data.notificationID;
          const eventID = response.notification.request.content.data.ID;

          switch (notificationType) {
            case 'event':
              navigation.navigate('ViewEvent', { currItem: eventID });
              dismissNotification({ variables: { id: notificationID } });
              break;
          }
        });
    })();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const viewEvent = (item) => {
    navigation.navigate('ViewEvent', { currItem: item.id });
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;

      if (Device.isDevice) {
        await updateToken({
          variables: {
            token: {
              expoNotificationToken: token,
            },
          },
        });
      }
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  if (error)
    return (
      <Text>
        <>Error: {error}</>
      </Text>
    );
  if (loading) return <Text>Loading...</Text>;
  const eventListData = [
    {
      title: 'Happening Now',
      data: data.events.filter(({ date }) => new Date(date) - new Date() < 0),
    },
    {
      title: 'Upcoming Events',
      data: data.events.filter(({ date }) => new Date(date) - new Date() >= 0),
    },
  ];
  return (
    <Container padding="none" flex={1}>
      <SectionList
        sections={!data?.events?.length ? [] : eventListData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        scrollIndicatorInsets={{ right: 1 }}
        renderItem={({ item }) => (
          <Container paddingVertical="none">
            <EventCard
              key={item.id}
              id={item.id}
              title={item.title}
              type={item.type}
              date={item.date}
              creator={item.creator}
              imageSource={{ uri: item.mapImageSource }}
              onSelect={viewEvent}
            />
          </Container>
        )}
        renderSectionHeader={({ section: { title, data } }) =>
          data.length > 0 ? (
            <Text
              preset="sublabel"
              marginLeft="s"
              marginTop={title === 'Upcoming Events' ? 'm' : undefined}
            >
              {title}
            </Text>
          ) : null
        }
        ListEmptyComponent={<NoEvents navigation={navigation} />}
      />
      <LargeFloatingButton
        accessibilityLabel="add event button"
        text="New Event"
        icon={plusThin}
        onPress={() => navigation.navigate('CreateEvent')}
        corner="bottom-right"
        distanceFromCorner="l"
      />
    </Container>
  );
}
