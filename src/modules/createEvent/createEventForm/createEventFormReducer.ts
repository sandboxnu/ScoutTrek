import {
  INITIALIZE_FORM,
  POPULATE_EVENT,
  ADD_FIELD,
  UPDATE_FIELD,
  DELETE_FIELD,
  CLEAR_FORM,
} from './CreateEventFormStore';

export type EventFormState = {
  currEventType: string | null;
  fields: { [key: string]: any };
  formIsValid: boolean;
};

// Generate initial state
export const initialState: EventFormState = {
  currEventType: null,
  fields: {},
  formIsValid: false,
};

export const createEventFormReducer = (
  state: EventFormState = initialState,
  action: any
): EventFormState => {
  switch (action.type) {
    case INITIALIZE_FORM:
      return {
        ...state,
        currEventType: action.eventType,
      };
    case POPULATE_EVENT:
      return {
        ...state,
        currEventType: action.eventType,
        fields: {
          ...action.event,
        },
      };
    case ADD_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.fieldID]: action.value,
        },
      };
    case UPDATE_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.fieldID]: action.value,
        },
      };
    case DELETE_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.fieldID]: undefined,
        },
      };
    case CLEAR_FORM:
      return initialState;
    default:
      return state;
  }
};
