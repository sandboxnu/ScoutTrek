import React, { useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Modal } from "react-native";

type InputMode = 'date' | 'time';

const addDateTime = (date: Date, time: Date) => {
  const sum = new Date(date.getTime());
  sum.setHours(time.getHours());
  sum.setMinutes(time.getMinutes());
  sum.setSeconds(time.getSeconds());
  sum.setMilliseconds(time.getMilliseconds());
  return sum;
};

interface DateTimeSelectorProps {
  minDate: Date;
  open: boolean;
  setOpen: (b: boolean) => void;
  onComplete: (d: Date) => void;
}

const DateTimeSelector = (props: DateTimeSelectorProps) => {
  const [date, setDate] = useState(new Date());
  const [inputMode, setInputMode] = useState<InputMode>('date');

  const onChange = (event: DateTimePickerEvent, input: Date | undefined) => {
    if (event.type != 'set' || input == undefined) {
      return;
    }
    if (inputMode == 'date') {
      setDate(input);
      props.setOpen(false);
      setInputMode('time');
      props.setOpen(true);
    } else {
      setDate(addDateTime(date, input));
      props.setOpen(false);
      props.onComplete(date);
    }
  }

  return (
    <React.Fragment>
      <Modal visible={props.open}>
        <DateTimePicker onChange={onChange} value={date} mode={inputMode} minimumDate={new Date()} />
      </Modal>
    </React.Fragment>
  );
}

export default DateTimeSelector;