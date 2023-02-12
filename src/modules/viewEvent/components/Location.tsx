import { LineItem, Icon, Text, Container } from 'ScoutDesign/library';
import { mapMarker } from 'ScoutDesign/icons';

const Location = ({
  heading,
  address,
}: {
  heading: string;
  address: string;
}) => {
  return (
    <LineItem
      accessibilityLabel="event-location"
      type="static"
      leftComponent={
        <Icon
          size="m"
          icon={mapMarker}
          color="interactiveDark"
          paddingHorizontal="micro"
        />
      }
    >
      <Text color="darkGrey" weight="bold" size="l" paddingBottom="micro">
        {address}
      </Text>
      <LineItem.Subheading>{heading}</LineItem.Subheading>
    </LineItem>
  );
};

export default Location;
