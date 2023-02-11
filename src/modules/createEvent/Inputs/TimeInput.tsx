import { useState } from 'react';
import {
  useEventForm,
  addEventFieldOfType,
} from 'CreateEvent/CreateEventFormStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import DefaultInputButton from './components/DefaultInputButton';
import DateTimeLineItem from './components/DateTimeLineItem';
import { View, Platform, Modal } from 'react-native';

const ChooseTime = ({
  id,
  Modal,
  modalProps,
  questionText,
  showAndroidClock,
  setShowAndroidClock,
}) => {
  const [{ fields }, dispatch] = useEventForm();
  const [time, setTime] = useState(new Date(fields?.[id] || Date.now()));

  const next = (androidTime) => {
    dispatch(addEventFieldOfType(id, androidTime || time));
  };

  if (Platform.OS === 'ios') {
    return (
      <Modal {...modalProps} onNext={next} title={questionText} valid={!!time}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 218,
              height: 64,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 40,
              backgroundColor: '#fff',
              borderColor: '#B3CCC8',
              borderWidth: 0.5,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.075,
              shadowRadius: 3.5,

              elevation: 2,
            }}
          >
            <DateTimePicker
              value={time}
              minuteInterval={5}
              mode="time"
              display="inline"
              onChange={(_, newDateString) => {
                if (!newDateString) {
                  return;
                }
                const date = new Date(newDateString);
                if (!isNaN(date.valueOf())) {
                  setTime(date);
                }
              }}
              textColor="#E98D01"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
  return showAndroidClock ? (
    <DateTimePicker
      value={time}
      minuteInterval={5}
      mode="time"
      display="default"
      onChange={(_, newDateString) => {
        next(new Date(newDateString));
        setShowAndroidClock(false);
      }}
    />
  ) : null;
};

export default {
  InitialButton: DefaultInputButton,
  EditingComponent: ChooseTime,
  CompletedComponent: (props) => <DateTimeLineItem {...props} format="time" />,
};
