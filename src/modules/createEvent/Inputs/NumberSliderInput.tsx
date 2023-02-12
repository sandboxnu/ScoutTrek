import Slider from '../../../components/formfields/Slider';
import { useEffect, useState } from 'react';
import {
  useEventForm,
  addEventFieldOfType,
} from 'CreateEvent/CreateEventFormStore';
import BasicLineItem from './components/BasicLineItem';
import DefaultInputButton from './components/DefaultInputButton';
import { EventInputProps } from './InputTypes';

const ChooseDistance = ({
  id,
  Modal,
  modalProps,
  questionText,
}: EventInputProps) => {
  const [{ fields }, dispatch] = useEventForm() || [{ fields: null }, null];
  const [distance, setDistance] = useState(fields?.[id] || 1);
  const [valid, setValid] = useState(!!fields?.[id] || false);

  useEffect(() => {
    if (distance) {
      setValid(true);
    }
  }, [distance]);

  const nextForm = () => {
    if (valid) {
      dispatch && dispatch(addEventFieldOfType(id, distance));
    }
  };

  return (
    <Modal title={questionText} {...modalProps} onNext={nextForm} valid={valid}>
      <Slider distance={distance} setDistance={setDistance} min={1} max={30} />
    </Modal>
  );
};

export default {
  InitialButton: DefaultInputButton,
  EditingComponent: ChooseDistance,
  CompletedComponent: BasicLineItem,
};
