import moment from 'moment';
import { Text, Icon, LineItem } from 'ScoutDesign/library';
import { clock } from 'ScoutDesign/icons';

const Time = ({ time, heading }) => {
  return (
    <LineItem
      accessibilityLabel="event-time"
      type="static"
      leftComponent={<Icon icon={clock} size="m" color="brandSecondaryDark" />}
    >
      <Text color="darkGrey" weight="bold" size="l" paddingBottom="micro">
        {moment(time).format('hh:mm A')}
      </Text>
      <LineItem.Subheading>{heading}</LineItem.Subheading>
    </LineItem>
  );
};

export default Time;
