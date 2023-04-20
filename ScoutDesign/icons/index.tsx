import {
  MaterialCommunityIcons,
  Foundation,
  Ionicons,
  EvilIcons,
  Entypo,
  Octicons,
  AntDesign,
  MaterialIcons,
  Fontisto,
} from '@expo/vector-icons';

export type IconPayloadType = {
  name: string;
  library: React.ElementType;
};

export class IconPayload {
  name: string;
  component: React.ElementType;

  constructor(icon: IconPayloadType) {
    this.name = icon.name;
    this.component = (props) => <icon.library {...props} />;
  }

  isValid() {
    return this.name && this.component;
  }
}

export const backArrow = new IconPayload({
  name: 'arrow-back',
  library: Ionicons,
});

export const backChevron = new IconPayload({
  name: 'ios-chevron-back',
  library: Ionicons,
});

export const bike = new IconPayload({
  name: 'bike',
  library: MaterialCommunityIcons,
});

export const boat = new IconPayload({
  name: 'ios-boat',
  library: Ionicons,
});

export const bonfire = new IconPayload({
  name: 'bonfire',
  library: Ionicons,
});

export const calendar = new IconPayload({
  name: 'calendar',
  library: AntDesign,
});

export const checkmark = new IconPayload({
  name: 'checkmark-sharp',
  library: Ionicons,
});

export const clock = new IconPayload({
  name: 'clock',
  library: MaterialCommunityIcons,
});

export const close = new IconPayload({
  name: 'close',
  library: Ionicons,
});

export const compass = new IconPayload({
  name: 'compass-sharp',
  library: Ionicons,
});

export const downCaret = new IconPayload({
  name: 'chevron-thin-down',
  library: Entypo,
});

export const dot = new IconPayload({
  name: 'primitive-dot',
  library: Octicons,
});

export const forwardArrow = new IconPayload({
  name: 'arrow-forward',
  library: Ionicons,
});

export const gearThin = new IconPayload({
  name: 'gear',
  library: EvilIcons,
});

export const hiking = new IconPayload({
  name: 'hiking',
  library: MaterialCommunityIcons,
});

export const home = new IconPayload({
  name: 'home',
  library: AntDesign,
});

export const light = new IconPayload({
  name: 'light-up',
  library: Entypo,
});

export const mapMarker = new IconPayload({
  name: 'map-marker-alt',
  library: Fontisto,
});

export const notifications = new IconPayload({
  name: 'notifications',
  library: Ionicons,
});

export const pencil = new IconPayload({
  name: 'edit',
  library: MaterialIcons,
});

export const people = new IconPayload({
  name: 'md-people',
  library: Ionicons,
});

export const contact = new IconPayload({
  name: 'md-contact',
  library: Ionicons,
});

export const plusBold = new IconPayload({
  name: 'plus',
  library: Foundation,
});

export const plusThin = new IconPayload({
  name: 'plus',
  library: MaterialCommunityIcons,
});

export const searchThin = new IconPayload({
  name: 'search',
  library: EvilIcons,
});

export const tent = new IconPayload({
  name: 'tent',
  library: MaterialCommunityIcons,
});

export const trash = new IconPayload({
  name: 'trash',
  library: Ionicons,
});

export const upArrow = new IconPayload({
  name: 'arrow-up',
  library: Ionicons,
});

export const upCaret = new IconPayload({
  name: 'chevron-thin-up',
  library: Entypo,
});
