
import DateTimeInput from "../createEvent/Inputs/DateTimeInput"
import { ScreenContainer, Text } from "ScoutDesign/library";



// use this component to display and test designs 
const DesignDisplay = ({navigation, route})  => {
  return (
    <ScreenContainer marginTop="xl" icon="back" back={navigation.goBack}>
      <DateTimeInput />
    </ScreenContainer>
  )
}


export default DesignDisplay;
/*
export default {
  InitialButton: DefaultInputButton,
  EditingComponent: DesignDisplay,
  CompletedComponent: (props) => <DateTimeLineItem {...props} format="interval" />,
};*/