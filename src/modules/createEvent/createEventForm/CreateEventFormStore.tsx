import { createContext, useContext, useReducer, Dispatch } from 'react';
import { EventFormState } from './createEventFormReducer';
import { Event, EventType } from 'data/types';

// Action types
export const INITIALIZE_FORM = 'INITIALIZE_FORM';
export const POPULATE_EVENT = 'POPULATE_EVENT';
export const ADD_FIELD = 'ADD_FIELD';
export const UPDATE_FIELD = 'UPDATE_FIELD';
export const DELETE_FIELD = 'DELETE_FIELD';
export const CLEAR_FORM = 'CLEAR_FORM';

// Actions
export const initializeEventForm = (eventType: string) => ({
  type: INITIALIZE_FORM,
  eventType,
});

export const populateEvent = (event: Event, eventType: EventType) => ({
  type: POPULATE_EVENT,
  event,
  eventType,
});

export const addEventFieldOfType = (fieldID: string, value: any) => ({
  type: ADD_FIELD,
  value,
  fieldID,
});

export const updateEventFieldOfType = (
  fieldID: string,
  value: string | number
) => ({
  type: UPDATE_FIELD,
  value,
  fieldID,
});

export const deleteEventFieldOfType = (fieldID: string) => ({
  type: DELETE_FIELD,
  fieldID,
});

export const clearEventForm = () => ({
  type: CLEAR_FORM,
});

const EventStore = createContext<
  [formState: EventFormState, dispatch: Dispatch<any>] | undefined
>(undefined);
EventStore.displayName = 'EventStore';

export const useEventForm = () => useContext(EventStore);

type Props = {
  initialState: EventFormState;
  reducer: (state: EventFormState, action: any) => EventFormState;
  children: any;
};

export const CreateEventFormProvider = ({
  initialState,
  reducer,
  children,
}: Props) => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  return (
    <EventStore.Provider value={[formState, dispatch]}>
      {children}
    </EventStore.Provider>
  );
};
