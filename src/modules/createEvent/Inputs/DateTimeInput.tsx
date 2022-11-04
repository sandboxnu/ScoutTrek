import React, { useEffect, useState } from "react";
import { ScreenContainer, Text } from "ScoutDesign/library";
import { addEventFieldOfType, useEventForm } from "../createEventForm/CreateEventFormStore";
import DateTimeLineItem from "./components/DateTimeLineItem";
import DefaultInputButton from "./components/DefaultInputButton";
import TapToEditContainer from "./components/TapToEditContainer";
import DateTimeSelector from "./DateTimeSelector";
import { Alert } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Row from "./Row";


// use this component to display and test designs 
const DateTimeInput = ()  => {
  const [{fields}, dispatch] = useEventForm();
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();

  useEffect(() => {
    if (!!startTime && !!endTime) {
      dispatch(addEventFieldOfType("startTime", startTime));
      dispatch(addEventFieldOfType("endTime", endTime));
    }
  })

  // runs the proceed function with the given Date d if it is after minDate but runs the deny function if not  
  const invalidateTime = (d : Date, minDate : Date | undefined, proceed : (d: Date) => void, deny : () => void) => {
    (minDate != undefined && d > minDate) ? proceed(d) : deny();
  }

  const invalidateEndTimeAlert = () => {
    Alert.alert("End time cannot be before start time!");
  }

  return (
    <React.Fragment>
      <Text>
        {startTime?.toString() + '\n' + endTime?.toString()}
      </Text>
      <DateTimeInputRow
        fieldName={'Start Time'}
        input={startTime}
        setInput={setStartTime}
        disabled={false}
      />
      <DateTimeInputRow
        fieldName={'End Time'}
        minDate={startTime}
        input={endTime}
        setInput={(d : Date) => invalidateTime(d, startTime, setEndTime, invalidateEndTimeAlert)}
        disabled={!startTime}
      />
    </React.Fragment>
  )
}

const setStartTimeFirstAlert = () => {
  Alert.alert("Start time must be set first!");
}



interface DateTimeInputProps {
  fieldName: string;
  minDate?: Date;
  input: undefined | Date;
  setInput: (d: Date) => void;
  disabled: boolean;
}

const DateTimeInputRow = ({fieldName, minDate=new Date(), input, setInput, disabled}: DateTimeInputProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Row fieldName={fieldName} valid={!!input}>
        {input ?
          <TapToEditContainer edit={() => setOpen(true)} >
            <DateTimeLineItem format='datetime' data={input}/>
          </TapToEditContainer> :
          <DefaultInputButton fieldName={fieldName} onPress={() => (disabled) ? setStartTimeFirstAlert() : setOpen(true)} />
        }
      </Row>
      <DateTimeSelector minDate={minDate} open={open} setOpen={setOpen} onComplete={setInput} />
    </React.Fragment>
  );
}

export default DateTimeInput;