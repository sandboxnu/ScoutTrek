import { createStackNavigator } from '@react-navigation/stack';

import ViewEvents from '../createEvent/eventList/ViewEventsList';
import CreateEvent from '../createEvent/CreateEvent';

export type EventStackParamList = {
  ViewEventsList: undefined;
  EventForm: { type: string; update: boolean };
};

const EventStack = createStackNavigator<EventStackParamList>();

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
