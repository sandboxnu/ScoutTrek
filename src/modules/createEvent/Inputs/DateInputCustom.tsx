import React, {useState} from 'react';
import moment from 'moment';
import {
  useEventForm,
  addEventFieldOfType,
} from 'CreateEvent/CreateEventFormStore';
import DefaultInputButton from './components/DefaultInputButton';
import DateTimeLineItem from './components/DateTimeLineItem';
import {CalendarList} from 'react-native-calendars';
import {ModalProps} from 'ScoutDesign/library/Widgets/Modal/Modal';

export interface EventInputPropsWithFunction {
  id: string;
  Modal: React.FC<ModalProps>;
  modalProps: ModalProps;
  questionText: string;
  onPress: (arg:string) => {};
}

const ChooseDate = ({id, Modal, modalProps, questionText, onPress}: EventInputPropsWithFunction) => {
  const [{fields}, dispatch] = useEventForm();
  const [date, setDate] = useState(
    moment(+fields?.[id], 'MM-DD-YYYY').isValid()
      ? moment(+fields?.[id])
      : moment()
  );
  
  return (
    <Modal
      {...modalProps}
      title={questionText}
      onNext={() => {onPress(date.toDate());}}
      valid={!!date}>
      <CalendarList
        current={date.format('YYYY-MM-DD')}
        minDate={date.format('YYYY-MM-DD')}
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
          onPress(day.dateString);
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
