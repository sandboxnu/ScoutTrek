import { ParamListBase, RouteProp, NavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const JOIN_GROUP = "JoinGroup" as const;
export const NOTIFICATIONS = "Notifications" as const;
export const MAIN = "Main" as const;
export const CREATE_EVENT = "CreateEvent" as const;
export const VIEW_EVENT = "ViewEvent" as const;

export enum MainStackRoutes {
    joinGroup = "JoinGroup",
    notifications = "Notifications",
    main = "Main",
    createEvent = "CreateEvent",
    viewEvent = "ViewEvent"
}

interface MainStackNavigationParamsList extends ParamListBase {
    [MainStackRoutes.joinGroup]: {};
    [MainStackRoutes.notifications]: {};
    [MainStackRoutes.main]: {};
    [MainStackRoutes.createEvent]: {};
    [MainStackRoutes.viewEvent]: {};
}



// Navigation Props
export type JoinGroupNavigationProp = NativeStackNavigationProp<
    MainStackNavigationParamsList,
	MainStackRoutes.joinGroup
>;

export type NotificationsNavigationProp = NativeStackNavigationProp<
    MainStackNavigationParamsList,
	MainStackRoutes.notifications
>;

export type MainNavigationProp = NativeStackNavigationProp<
    MainStackNavigationParamsList,
	MainStackRoutes.main
>;

export type CreateEventNavigationProp = NativeStackNavigationProp<
    MainStackNavigationParamsList,
	MainStackRoutes.createEvent
>;

export type ViewEventNavigationProp = NativeStackNavigationProp<
    MainStackNavigationParamsList,
	MainStackRoutes.viewEvent
>;

// Route Props
export type JoinGroupRouteProp = RouteProp<
    MainStackNavigationParamsList, 
    MainStackRoutes.joinGroup
>;

export type NotificationRouteProp = RouteProp<
    MainStackNavigationParamsList, 
    MainStackRoutes.notifications
>;

export type MainRouteProp = RouteProp<
    MainStackNavigationParamsList, 
    MainStackRoutes.main
>;

export type CreateEventRouteProp = RouteProp<
    MainStackNavigationParamsList, 
    MainStackRoutes.createEvent
>;

export type ViewEventRouteProp = RouteProp<
    MainStackNavigationParamsList, 
    MainStackRoutes.viewEvent
>;

