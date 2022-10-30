import React, { useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Modal } from "react-native";

type InputMode = 'date' | 'time';

const formatDate = (date: Date, time: Date) => {
  return `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
};

const DateTimeSelector = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [inputMode, setInputMode] = useState<InputMode>('date');
  const [openDateModal, setOpenDateModal] = useState(true);
  const [openTimeModal, setOpenTimeModal] = useState(false);

  const onChange = (event: DateTimePickerEvent, input: Date | undefined) => {
    if (event.type != 'set' || input == undefined) {
      return;
    }
    if (inputMode == 'date') {
      setDate(input);
      setInputMode('time');
      setOpenDateModal(false);
      setOpenTimeModal(true);
    }
  }

  return (
    <React.Fragment>
      <Modal visible={openDateModal}>
        <DateTimePicker onChange={onChange} value={date} mode={inputMode} />
      </Modal>
      <Modal visible={openTimeModal}>
        <DateTimePicker onChange={onChange} value={date} mode={inputMode} />
      </Modal>
    </React.Fragment>
    
  );
}

export default DateTimeSelector;