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

const chooseInterval = ({id, Modal, modalProps, questionText}: EventInputProps) => {
  return <div>amazing interval input</div>;
}