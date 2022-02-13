import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
