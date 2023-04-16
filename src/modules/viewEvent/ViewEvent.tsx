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
  const [_, dispatch] = useEventForm() || [null, null];
  const { currItem } = route.params;
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { id: currItem },
  });
  const [deleteEvent] = useMutation(DELETE_EVENT, deleteEventConfig);
  const leadershipRoles = [
    'SCOUTMASTER',
    'ASST_SCOUTMASTER',
    'SENIOR_PATROL_LEADER',
    'PATROL_LEADER',
  ];
  // TODO: create GET_USER_NAME
  const {
    data: creatorName,
    error: creatorNameError,
    loading: creatorNameLoading,
  } = useQuery(GET_USER_NAME, {
    variables: { id: data.event.creator },
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
        return renderAttendees(data.event.roster.yes);
      case 1:
        return renderAttendees(data.event.roster.no);
      case 2:
        return renderAttendees(data.event.roster.maybe);
      case 3:
        return renderAttendees(data.event.roster.noResponse);
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
                id: data.event.id,
              },
            });
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) return null;
  if (error)
    return <Text style={{ paddingTop: 50 }}>`Error! ${error.toString()}`</Text>;

  return (
    <ScreenContainer
      padding="none"
      paddingBottom="xl"
      icon="back"
      back={navigation.goBack}
      headingImage={
        data.event.mapImageSource
          ? { source: { uri: data.event.mapImageSource } }
          : undefined
      }
    >
      {data.event.meetLocation ? (
        <>
          <Location
            heading="Meet Place"
            address={data.event.meetLocation.address}
          />
          <Time time={data.event.meetTime} heading="Arrive at meet place" />
          <Time time={data.event.leaveTime} heading="Leave meet place" />
        </>
      ) : null}

      <Location
        heading="Event location"
        address={data.event.location.address}
      />
      <Date date={data.event.date} heading="Event date" />
      <Time time={data.event.startTime} heading="Start time" />
      {data.event.endTime ? (
        <Time time={data.event.endTime} heading="Estimated return" />
      ) : null}
      {creatorName ? <Text>{creatorName}</Text> : null}
      {data.event.endDate ? (
        <Date date={data.event.endDate} heading="Event ends" />
      ) : null}
      {data.event.pickupTime ? (
        <Time time={data.event.pickupTime} heading="Pick up Scouts" />
      ) : null}
      {data.event.checkoutTime ? (
        <Time time={data.event.checkoutTime} heading="Check out" />
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

      <Description description={data.event.description} />

      <CircleButton
        accessibilityLabel="edit-event"
        icon={pencil}
        onPress={() => {
          const { id, type, creator, mapImageSource, ...eventData } =
            data.event;
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
    </ScreenContainer>
  );
};

export default EventDetailsScreen;
