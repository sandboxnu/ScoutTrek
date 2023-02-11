import moment from 'moment';
import { Text, Icon, LineItem } from 'ScoutDesign/library';
import { calendar } from 'ScoutDesign/icons';

const Date = ({ date, heading }) => {
  return (
    <LineItem
      accessibilityLabel="event-time"
      type="static"
      leftComponent={<Icon icon={calendar} size="m" color="brandPrimaryDark" />}
    >
      <Text color="darkGrey" weight="bold" size="l" paddingBottom="micro">
        {moment(date).format('dddd, MMMM Do')}
      </Text>
      <LineItem.Subheading>{heading}</LineItem.Subheading>
    </LineItem>
  );
};

export default Date;
