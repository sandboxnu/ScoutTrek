import { useState } from 'react';
import {
  useEventForm,
  addEventFieldOfType,
} from 'CreateEvent/CreateEventFormStore';
import BasicLineItem from './components/BasicLineItem';
import { ColorfulTextInput } from 'ScoutDesign/library';
import { EventInputProps } from './InputTypes';
import DefaultInputButton from './components/DefaultInputButton';

const ChooseName = ({
  id,
  Modal,
  modalProps,
  questionText,
}: EventInputProps) => {
  const [{ fields }, dispatch] = useEventForm() || [{ fields: null }, null];
  const [title, setTitle] = useState(fields?.[id] || '');
  const [nameIsValid, setNameIsValid] = useState(!!fields?.[id] || false);

  const next = () => {
    if (nameIsValid) {
      dispatch && dispatch(addEventFieldOfType(id, title));
    }
  };

  return (
    <Modal
      {...modalProps}
      onNext={next}
      title={questionText}
      valid={nameIsValid}
    >
      <ColorfulTextInput
        value={title}
        autoCompleteType="off"
        autoCorrect={false}
        onValueChange={(value) => {
          if (typeof value === 'number') {
            value = value.toString();
          }
          setTitle(value);
          setNameIsValid(value.length > 2);
        }}
      />
    </Modal>
  );
};

export default {
  InitialButton: DefaultInputButton,
  EditingComponent: ChooseName,
  CompletedComponent: BasicLineItem,
};
