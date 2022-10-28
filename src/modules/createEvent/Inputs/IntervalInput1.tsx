import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';



const DateTimeSelector = () => {
  const [date, setDate] = useState(new Date());
  return (
    <DateTimePicker onChange={
      (event, date) => event.type == 'set' && date != undefined && setDate(date)
    } value={date} />
  );
}