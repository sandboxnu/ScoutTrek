
import { useState } from "react";
import { ScreenContainer, Text } from "ScoutDesign/library";
import { useEventForm } from "../createEvent/createEventForm/CreateEventFormStore";
import DateTimeLineItem from "../createEvent/Inputs/components/DateTimeLineItem";
import DefaultInputButton from "../createEvent/Inputs/components/DefaultInputButton";
import TapToEditContainer from "../createEvent/Inputs/components/TapToEditContainer";
import DateTimeSelector from "../createEvent/Inputs/IntervalInput1";
import Row from "../createEvent/Inputs/Row";


// use this component to display and test designs 
const DesignDisplay = ({navigation, route})  => {
  const [{fields}, dispatch] = useEventForm();
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();

    return (
        <ScreenContainer marginTop="xl" icon="back" back={navigation.goBack}>
            <Text>
                {startTime?.toString() + '\n' + endTime?.toString()}
            </Text>
            <DateTimeInput
              fieldName={'Start Time'}
              input={startTime}
              setInput={setStartTime}
              disabled={false}
            />
            <DateTimeInput
              fieldName={'End Time'}
              minDate={startTime}
              input={endTime}
              setInput={setEndTime}
              disabled={!startTime}
            />
        </ScreenContainer>
    )
}

interface DateTimeInputProps {
  fieldName: string;
  minDate?: Date;
  input: undefined | Date;
  setInput: (d: Date) => void;
  disabled: boolean;
}
const DateTimeInput = ({fieldName, minDate=new Date(), input, setInput, disabled}: DateTimeInputProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Row fieldName={fieldName} valid={!!input}>
        {input ?
          <TapToEditContainer edit={() => setOpen(true)} >
            <DateTimeLineItem format='datetime' data={input}/>
          </TapToEditContainer> :
          <DefaultInputButton fieldName={fieldName} onPress={() => setOpen(true)} disabled={disabled}/>
        }
      </Row>
      <DateTimeSelector minDate={minDate} open={open} setOpen={setOpen} onComplete={setInput} />
    </>
  );
}

export default DesignDisplay;
/*
export default {
  InitialButton: DefaultInputButton,
  EditingComponent: DesignDisplay,
  CompletedComponent: (props) => <DateTimeLineItem {...props} format="interval" />,
};*/