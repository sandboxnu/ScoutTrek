import {gql, useMutation, useQuery} from '@apollo/client';
import EventInputTemplate from './Inputs/EventInputTemplate';
import {GET_EVENTS, EVENT_FIELDS} from 'data';
import {useEventForm, clearEventForm} from 'CreateEvent/CreateEventFormStore';
import {ScreenContainer, Container, Button} from 'ScoutDesign/library';
import { ParamListBase } from '@react-navigation/native';
import { FormInput } from './Inputs/FormTypes';
import { Form } from './Inputs/FormComponent';

const ADD_EVENT = gql`
  ${EVENT_FIELDS}
  mutation AddEvent($event: AddEventInput!) {
    event: addEvent(input: $event) {
      ...EventFragment
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: ID!, $updates: UpdateEventInput!) {
    updateEvent(id: $id, input: $updates) {
      ...EventFragment
    }
  }
  ${EVENT_FIELDS}
`;

export const GET_EVENT_SCHEMAS = gql`
  query EventSchemas {
    eventSchemas
  }
`;

const GET_EVENT_SCHEMAS2 = gql`
  query EventSchemas {
    eventFormSchemas
  }
`;

interface ScreenComponentProps<T extends string> {
  navigation: ParamListBase;
  route: T
}

const CreateEvent = ({navigation, route}: ScreenComponentProps<'EventForm'>) => {
  const [addEvent] = useMutation(ADD_EVENT, {
    update(cache, {data: {event}}) {
      try {
        const {events} = cache.readQuery({query: GET_EVENTS});
        cache.writeQuery({
          query: GET_EVENTS,
          data: {events: events.concat([event])},
        });
      } catch {
        cache.writeQuery({
          query: GET_EVENTS,
          data: {events: [event]},
        });
      }
    },
  });
  const {loading: schemaLoading, data} = useQuery(GET_EVENT_SCHEMAS);
  // TODO: use this new endpoint instead
  const {loading: eventsLoading, data: schemaResponse} = useQuery(GET_EVENT_SCHEMAS);
  // TODO: make this hit the new createEvent endpoint instead of updateEvent
  const createEvent2 = (input: FormInput) => {

  }

  const [state, dispatch] = useEventForm();
  const {fields} = state;

  const [updateEvent] = useMutation(UPDATE_EVENT, {
    update(cache, {data: {updateEvent: event}}) {
      try {
        const {events} = cache.readQuery({query: GET_EVENTS});
        cache.writeQuery({
          query: GET_EVENTS,
          data: {
            events: events
              .filter((existingEvent) => existingEvent.id !== event.id)
              .concat([event]),
          },
        });
      } catch {
        cache.writeQuery({
          query: GET_EVENTS,
          data: {events: [event]},
        });
      }
    },
  });

  if (schemaLoading) return null;

  const schema = data['eventSchemas'][route.params.type.toLowerCase()];

  const createEvent = () => {
    const eventDataCopy = {...fields};
    if (route.params.update) {
      const omitInvalidFields = (key, value) => {
        if (key === '__typename') {
          return undefined;
        } else if (value === null) {
          return undefined;
        } else {
          return value;
        }
      };
      const cleanedEventData = JSON.parse(
        JSON.stringify(eventDataCopy),
        omitInvalidFields
      );
      updateEvent({
        variables: {id: route.params.id, updates: cleanedEventData},
      })
        .then(() => {
          return new Promise((res, rej) => {
            dispatch(clearEventForm());
            navigation.goBack();
            res();
          });
        })
        .catch((err) => console.log(err));
    } else {
      addEvent({
        variables: {
          event: {
            type: schema.metaData.eventID,
            ...eventDataCopy,
          },
        },
      })
        .then(() => {
          return new Promise((res, rej) => {
            navigation.popToTop();
            navigation.navigate('UpcomingEvents');
            res();
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const disabledFields = schema?.options
    ? schema.options.reduce((accumulator, currentValue) => {
        return fields?.[currentValue.condition] === currentValue['shown']
          ? [...accumulator]
          : [...accumulator, ...currentValue.hiddenFields];
      }, [])
    : [];

  return (
    <ScreenContainer
      icon="back"
      padding="none"
      paddingTop="xl"
      back={() => {
        dispatch(clearEventForm());
        navigation.goBack();
      }}>
      {/* Schema representing all the types of events currently in the app. This
      comes from the server */}
      <Form spec={data.data} onSubmit={createEvent2} />
      <Container paddingTop="l" paddingBottom="xl">
        <Button
          accessibilityLabel="submit"
          text={route.params?.update ? 'Update' : 'Create Event'}
          onPress={createEvent}
          fullWidth
        />
      </Container>
    </ScreenContainer>
  );
};

export default CreateEvent;
