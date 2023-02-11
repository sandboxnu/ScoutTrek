import { createStackNavigator } from '@react-navigation/stack';
import { JoinGroupFormProvider } from '../joinGroup/JoinGroupForm/JoinGroupFormStore';
import {
  initialState,
  joinGroupFormReducer,
} from '../joinGroup/JoinGroupForm/joinGroupFormReducer';

import JoinTroop from '../joinGroup/JoinTroop';
import AddChildren from '../joinGroup/AddChildren';
import CreateTroop from '../joinGroup/components/CreateTroop';
import ChooseRole from '../joinGroup/ChooseRole';
import JoinPatrol from '../joinGroup/JoinPatrol';

const JoinGroupStack = createStackNavigator();

const JoinGroupNavigator = () => {
  return (
    <JoinGroupFormProvider
      initialState={initialState}
      reducer={joinGroupFormReducer}
    >
      <JoinGroupStack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <JoinGroupStack.Screen name="JoinTroop" component={JoinTroop} />
        <JoinGroupStack.Screen name="CreateTroop" component={CreateTroop} />
        <JoinGroupStack.Screen name="ChooseRole" component={ChooseRole} />
        <JoinGroupStack.Screen name="AddChildren" component={AddChildren} />
        <JoinGroupStack.Screen name="JoinPatrol" component={JoinPatrol} />
      </JoinGroupStack.Navigator>
    </JoinGroupFormProvider>
  );
};

export default JoinGroupNavigator;
