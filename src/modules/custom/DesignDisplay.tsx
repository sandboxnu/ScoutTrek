
import { ScreenContainer, Text } from "ScoutDesign/library";
import IntervalInputScreen from "../createEvent/Inputs/IntervalInput";


// use this component to display and test designs 
const DesignDisplay = ({navigation, route})  => {
    return (
        <ScreenContainer marginTop="xl" icon="back" back={navigation.goBack}>
            <Text>
                TESTING
            </Text>
            <IntervalInputScreen />
        </ScreenContainer>
    )
}

export default DesignDisplay;