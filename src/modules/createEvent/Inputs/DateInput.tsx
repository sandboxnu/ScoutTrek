import React, { useState } from 'react';
import moment from 'moment';
import {
  useEventForm,
  addEventFieldOfType,
} from 'CreateEvent/CreateEventFormStore';
import DefaultInputButton from './components/DefaultInputButton';
import DateTimeLineItem from './components/DateTimeLineItem';
import { CalendarList } from 'react-native-calendars';
import { EventInputProps } from './InputTypes';

const ChooseDate = ({
  id,
  Modal,
  modalProps,
  questionText,
}: EventInputProps) => {
  const [{ fields }, dispatch] = useEventForm();
  const [date, setDate] = useState(
    moment(new Date(fields?.[id]), 'MM-DD-YYYY').isValid()
      ? moment(new Date(fields?.[id]))
      : moment()
  );

  const nextForm = () => {
    dispatch(addEventFieldOfType(id, date));
  };

  return (
    <Modal
      {...modalProps}
      title={questionText}
      onNext={nextForm}
      valid={!!date}
    >
      <CalendarList
        current={date.format('YYYY-MM-DD')}
        calendarStyle={{ width: '100%' }}
        theme={{
          textDayFontFamily: 'metropolis-regular',
          textMonthFontFamily: 'metropolis-bold',
        }}
        markingType={'custom'}
        markedDates={{
          [moment().format('YYYY-MM-DD')]: {
            customStyles: {
              container: {
                backgroundColor: '#DBE6E1',
                elevation: 2,
              },
              text: {
                color: 'black',
              },
            },
          },
          [date.format('YYYY-MM-DD')]: {
            selected: true,
            disableTouchEvent: true,
          },
        }}
        onDayPress={(day) => {
          setDate(moment(day.dateString));
        }}
      />
    </Modal>
  );
};

export default {
  InitialButton: DefaultInputButton,
  EditingComponent: ChooseDate,
  CompletedComponent: (props) => <DateTimeLineItem {...props} format="date" />,
};
