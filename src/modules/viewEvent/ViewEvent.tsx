import { Alert } from 'react-native';
import { Text } from 'ScoutDesign/library';

import { useEventForm, populateEvent } from 'CreateEvent/CreateEventFormStore';

import { gql, useMutation, useQuery } from '@apollo/client';
import Location from './components/Location';
import Time from './components/Time';
import Date from './components/Date';
import Description from './components/Description';

import { GET_EVENTS, EVENT_FIELDS, GET_CURR_USER } from 'data';

import { Button, CircleButton, ScreenContainer } from 'ScoutDesign/library';
import { pencil } from 'ScoutDesign/icons';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/MainStackNavigator';

import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useState } from 'react';

import { FlatList } from 'react-native';

import { StyleSheet } from 'react-native';
import EventOwner from './components/EventOwner';
import ChangeEventOwnerDrawer from './components/ChangeEventOwnerDrawer';

const AllAttendeesList = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const YesAttendeesList = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const NoAttendeesList = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const MaybeAttendeesList = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const NoResponseAttendeesList = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const renderScene = SceneMap({
  all: AllAttendeesList,
  yes: YesAttendeesList,
  no: NoAttendeesList,
  maybe: MaybeAttendeesList,
  noResponse: NoResponseAttendeesList,
});

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      ...EventFragment
      roster {
        yes {
          name
          id
        }
        no {
          name
          id
        }
        maybe {
          name
          id
        }
        noResponse {
          name
          id
        }
      }
    }
  }
  ${EVENT_FIELDS}
`;

export const GET_USER_NAME = gql`
  query GetUserName($id: ID!) {
    user(id: $id) {
      name
    }
  }
`;

export const deleteEventConfig = {
  update(cache, { data: { deleteEvent } }) {
    try {
      const { events } = cache.readQuery({ query: GET_EVENTS });
      const updatedEvents = events.filter((t) => t.id !== deleteEvent.id);
      cache.writeQuery({
        query: GET_EVENTS,
        data: { events: updatedEvents },
      });
    } catch (err) {
      console.error(err);
    }
  },
};

const EventDetailsScreen = ({
  route,
  navigation,
}: StackScreenProps<MainStackParamList, 'ViewEvent'>) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [_, dispatch] = useEventForm() || [null, null];
  const { currItem } = route.params;
  const {
    loading: eventLoading,
    error: eventError,
    data: eventData,
    refetch: eventRefetch,
  } = useQuery(GET_EVENT, {
    variables: { id: currItem },
  });
  const [deleteEvent] = useMutation(DELETE_EVENT, deleteEventConfig);
  const leadershipRoles = [
    'SCOUTMASTER',
    'ASST_SCOUTMASTER',
    'SENIOR_PATROL_LEADER',
    'PATROL_LEADER',
  ];
  const {
    data: usernameData,
    error: usernameError,
    loading: usernameLoading,
  } = useQuery(GET_USER_NAME, {
    variables: { id: eventData.event.creator },
  });
  const {
    data: userData,
    error: userError,
    loading: userLoading,
  } = useQuery(GET_CURR_USER);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'yes', title: 'Yes' },
    { key: 'no', title: 'No' },
    { key: 'maybe', title: 'Maybe' },
    { key: 'noResponse', title: 'N/A' },
  ]);

  if (eventLoading || usernameLoading || userLoading) {
    return <Text>Loading...</Text>;
  }

  function renderAttendees(attendees: any) {
    return (
      <FlatList
        data={attendees}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 1,
                backgroundColor: '#e5e5e5',
                marginTop: 10,
                marginBottom: 10,
              }}
            />
          );
        }}
      />
    );
  }

  const renderAttendeesList = () => {
    switch (index) {
      case 0:
        return renderAttendees(eventData.event.roster.yes);
      case 1:
        return renderAttendees(eventData.event.roster.no);
      case 2:
        return renderAttendees(eventData.event.roster.maybe);
      case 3:
        return renderAttendees(eventData.event.roster.noResponse);
    }
  };

  const renderLabel = (scene) => {
    return (
      <Text
        style={{
          color: scene.focused ? 'green' : 'black',
          textDecorationLine: scene.focused ? 'underline' : 'none',
        }}
      >
        {scene.route.title}
      </Text>
    );
  };

  const handleDeleteEvent = () => {
    Alert.alert(
      'Are you sure you want to cancel this event?',
      'This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            await deleteEvent({
              variables: {
                id: eventData.event.id,
              },
            });
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const onChangeOwner = () => {
    console.log('Changing owner');
    setIsDrawerOpen(true);
  };

  const onDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  if (eventLoading) return null;
  if (eventError)
    return (
      <Text style={{ paddingTop: 50 }}>`Error! ${eventError.toString()}`</Text>
    );

  return (
    <ScreenContainer
      padding="none"
      paddingBottom="xl"
      icon="back"
      back={navigation.goBack}
      headingImage={
        eventData.event.mapImageSource
          ? { source: { uri: eventData.event.mapImageSource } }
          : undefined
      }
    >
      {eventData.event.meetLocation ? (
        <>
          <Location
            heading="Meet Place"
            address={eventData.event.meetLocation.address}
          />
          <Time
            time={eventData.event.meetTime}
            heading="Arrive at meet place"
          />
          <Time time={eventData.event.leaveTime} heading="Leave meet place" />
        </>
      ) : null}

      <Location
        heading="Event location"
        address={eventData.event.location.address}
      />
      <Date date={eventData.event.date} heading="Event date" />
      <Time time={eventData.event.startTime} heading="Start time" />
      {eventData.event.endTime ? (
        <Time time={eventData.event.endTime} heading="Estimated return" />
      ) : null}
      <EventOwner
        isOwner={userData.id === eventData.event.creator}
        owner={usernameData.name}
        onChangeOwner={onChangeOwner}
      />
      {eventData.event.endDate ? (
        <Date date={eventData.event.endDate} heading="Event ends" />
      ) : null}
      {eventData.event.pickupTime ? (
        <Time time={eventData.event.pickupTime} heading="Pick up Scouts" />
      ) : null}
      {eventData.event.checkoutTime ? (
        <Time time={eventData.event.checkoutTime} heading="Check out" />
      ) : null}

      <Text preset="h2" paddingHorizontal="m" paddingTop="s">
        Attendees
      </Text>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            renderLabel={renderLabel}
            style={{ backgroundColor: '#FFFFFF' }}
          />
        )}
      />

      {renderAttendeesList()}

      <Description description={eventData.event.description} />

      <CircleButton
        accessibilityLabel="edit-event"
        icon={pencil}
        onPress={() => {
          const { id, type, creator, mapImageSource, ...eventData } =
            eventData.event;
          dispatch && dispatch(populateEvent(eventData, type));
          navigation.navigate('CreateEvent', {
            screen: 'EventForm',
            params: {
              type: type,
              id: id,
              update: true,
            },
          });
        }}
        corner="bottom-right"
        distanceFromCorner="l"
      />
      {leadershipRoles.indexOf(userData.currUser.currRole) > -1 && (
        <Button
          accessibilityLabel="cancel-event"
          text="Cancel event"
          backgroundColor="white"
          textColor="dangerDark"
          onPress={handleDeleteEvent}
        />
      )}

      <ChangeEventOwnerDrawer
        eventOwnerName={usernameData.name}
        visible={isDrawerOpen}
        onClose={onDrawerClose}
        onRefetch={eventRefetch}
      />
    </ScreenContainer>
  );
};

export default EventDetailsScreen;
