import {
  useEventForm,
  addEventFieldOfType,
} from 'CreateEvent/CreateEventFormStore';
import RadioChoice from '../../../components/formfields/RadioChoice';

// TODO: gql form schema rewrite: probably update the types here using the new form too
const OptionsInput = ({ initial, questionText, option1, option2, id }) => {
  const [_, dispatch] = useEventForm() || [null, null];
  return (
    <RadioChoice
      initial={initial}
      text={questionText}
      a={{ label: option1, value: option1 }}
      b={{ label: option2, value: option2 }}
      onPress={(choice) => {
        dispatch && dispatch(addEventFieldOfType(id, choice));
      }}
    />
  );
};

export default {
  InitialButton: OptionsInput,
  EditingComponent: null,
  CompletedComponent: null,
};
