import React, {useState} from 'react';
import moment from 'moment';
import {
  useEventForm,
  addEventFieldOfType,
} from 'CreateEvent/CreateEventFormStore';
import DefaultInputButton from './components/DefaultInputButton';
import DateTimeLineItem from './components/DateTimeLineItem';
import {CalendarList} from 'react-native-calendars';
import {EventInputProps} from './InputTypes';
import {ModalProps} from 'ScoutDesign/library/Widgets/Modal/Modal';

const chooseInterval = ({id, Modal, modalProps, questionText}: EventInputProps) => {
  return <div>amazing interval input</div>;
}

// this component uses the DateInput and TimeInput components 
const DateAndTime = ({ids, Modals, modalPropsList, questionTexts}: EventInputPropsList) => {
  return <div>

  </div>
}

interface EventInputPropsList {
  ids: string[];
  Modals: React.FC<ModalProps>[];
  modalPropsList: ModalProps[];
  questionTexts: string[];
}