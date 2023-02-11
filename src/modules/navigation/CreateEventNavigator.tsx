import { createStackNavigator } from '@react-navigation/stack';

import ViewEvents from '../createEvent/eventList/ViewEventsList';
import CreateEvent from '../createEvent/CreateEvent';

const EventStack = createStackNavigator();

const EventStackNavigator = () => {
  return (
    <EventStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <EventStack.Screen name="ViewEventsList" component={ViewEvents} />
      <EventStack.Screen name="EventForm" component={CreateEvent} />
    </EventStack.Navigator>
  );
};

export default EventStackNavigator;
