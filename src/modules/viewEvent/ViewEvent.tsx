import { Text, Alert } from 'react-native';

import { useEventForm, populateEvent } from 'CreateEvent/CreateEventFormStore';

import { gql, useMutation, useQuery } from '@apollo/client';
import Location from './components/Location';
import Time from './components/Time';
import Date from './components/Date';
import Description from './components/Description';

import { GET_EVENTS, EVENT_FIELDS } from 'data';

import { Button, CircleButton, ScreenContainer } from 'ScoutDesign/library';
import { pencil } from 'ScoutDesign/icons';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/MainStackNavigator';

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
      {data.event.endDate ? (
        <Date date={data.event.endDate} heading="Event ends" />
      ) : null}
      {data.event.pickupTime ? (
        <Time time={data.event.pickupTime} heading="Pick up Scouts" />
      ) : null}
      {data.event.checkoutTime ? (
        <Time time={data.event.checkoutTime} heading="Check out" />
      ) : null}

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
      <Button
        accessibilityLabel="cancel-event"
        text="Cancel event"
        backgroundColor="white"
        textColor="dangerDark"
        onPress={handleDeleteEvent}
      />
    </ScreenContainer>
  );
};

export default EventDetailsScreen;
