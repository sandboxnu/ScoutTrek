import {
  useEventForm,
  addEventFieldOfType,
} from 'CreateEvent/CreateEventFormStore';
import RadioChoice from '../../../components/formfields/RadioChoice';

const OptionsInput = ({ initial, questionText, option1, option2, id }) => {
  const [_, dispatch] = useEventForm();
  return (
    <RadioChoice
      initial={initial}
      text={questionText}
      a={{ label: option1, value: option1 }}
      b={{ label: option2, value: option2 }}
      onPress={(choice) => {
        dispatch(addEventFieldOfType(id, choice));
      }}
    />
  );
};

export default {
  InitialButton: OptionsInput,
};
