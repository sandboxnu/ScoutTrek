import { ScreenContainer } from "ScoutDesign/library";


// use this component to display and test designs 
const DesignDisplay = ({navigation, route})  => {
    return (
        <ScreenContainer marginTop="xl" icon="back" back={navigation.goBack}>
            <text style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                TESTING
            </text>
        </ScreenContainer>
    )
}

export default DesignDisplay;