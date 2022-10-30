
import { useState } from "react";
import { ScreenContainer, Text } from "ScoutDesign/library";
import IntervalInputScreen from "../createEvent/Inputs/IntervalInput";
import DateTimeSelector from "../createEvent/Inputs/IntervalInput1";


// use this component to display and test designs 
const DesignDisplay = ({navigation, route})  => {
  const [selected, setSelected] = useState<Date>();
    return (
        <ScreenContainer marginTop="xl" icon="back" back={navigation.goBack}>
            <Text>
                {selected?.toString()}
            </Text>
            <DateTimeSelector onComplete={setSelected}/>
        </ScreenContainer>
    )
}

export default DesignDisplay;