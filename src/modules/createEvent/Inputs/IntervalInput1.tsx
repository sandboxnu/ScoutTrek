import { useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Modal } from "react-native";

type InputMode = 'date' | 'time';

const formatDate = (date: Date, time: Date) => {
  return `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
};

const DateTimeSelector = () => {
  const [date, setDate] = useState(new Date());
  const [inputMode, setInputMode] = useState<InputMode>('date');
  const [open, setOpen] = useState(false);

  const onChange = (event: DateTimePickerEvent, input: Date | undefined) => {
    if (event.type != 'set' || input == undefined) {
      return;
    }
    if (inputMode == 'date') {
      setDate(input);
      setInputMode('time');
    } else {
      setDate(new Date(formatDate(date, input)));
      setOpen(false);
    }
  }

  return (
    <Modal visible={open}>
      <DateTimePicker onChange={onChange} value={date} mode={inputMode} />
    </Modal>
  );
}

export default DateTimeSelector;