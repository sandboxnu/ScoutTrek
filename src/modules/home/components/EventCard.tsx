import { EventType } from 'data/types';
import { EventSignature } from '../UpcomingEvents';
import { Card, Badge, Image, Text, Container } from 'ScoutDesign/library';
import { convertEventIDToText } from 'data/utils/convertIDsToStrings';
import {
  bike,
  boat,
  bonfire,
  compass,
  hiking,
  people,
  tent,
} from 'ScoutDesign/icons';
import { ImageSourcePropType } from 'react-native';

function getIcon(eventType: EventType) {
  switch (eventType) {
    case 'HIKE':
      return hiking;
    case 'BIKE_RIDE':
      return bike;
    case 'CANOE_TRIP':
      return boat;
    case 'TROOP_MEETING':
      return people;
    case 'CAMPOUT':
      return bonfire;
    case 'SUMMER_CAMP':
      return tent;
    default:
      return compass;
  }
}

type Props = {
  id: string;
  title: string;
  type: EventType;
  date: string;
  creator?: {
    id: string;
    name: string;
  };
  imageSource: ImageSourcePropType;
  onSelect: (item: EventSignature) => void;
};

const EventCard = ({
  id,
  title,
  type,
  date,
  creator,
  imageSource,
  onSelect,
}: Props) => {
  const absDate = new Date(date);
  const offset = -1 * absDate.getTimezoneOffset() * 60 * 1000;
  const localDate = new Date(absDate.getTime() - offset);
  return (
    <Card
      accessibilityLabel="solid card"
      headerLeft={
        <Badge
          accessibilityLabel="campout-solid-badge"
          text={convertEventIDToText(type)}
          icon={getIcon(type)}
          color="brandSecondaryDark"
        />
      }
      titleAlignment="right"
      headerRight={
        <Container padding="none" flexDirection="row" alignItems="center">
          <Text preset="micro">
            {
              [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
              ][localDate.getDay()]
            }
          </Text>
          <Text weight="light" marginHorizontal="micro" paddingLeft="micro">
            {
              [
                'Jan.',
                'Feb.',
                'Mar.',
                'Apr.',
                'May',
                'June',
                'July',
                'Aug',
                'Sept.',
                'Oct.',
                'Nov.',
                'Dec.',
              ][localDate.getMonth()]
            }
          </Text>
          <Text preset="h3">{localDate.getDate()}</Text>
        </Container>
      }
      onPress={() => onSelect({ id, type })}
    >
      <Image
        accessibilityLabel="card-picture"
        placement="foreground"
        radius="m"
        padding="micro"
        size={{
          height: 100,
        }}
        source={imageSource}
      />
      <Card.Description
        heading={title}
        bodyText={`Created by ${creator?.name}`}
      />
    </Card>
  );
};

export default EventCard;
