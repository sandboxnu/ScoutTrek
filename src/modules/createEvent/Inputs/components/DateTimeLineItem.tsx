import moment from 'moment';
import { Text } from 'ScoutDesign/library';

type Props = {
  data: any;
  format: 'date' | 'time';
};

// @todo - create more scalable type for data display completed components
const DateTimeLineItem = ({ data, format }: Props) => {
  return (
    <Text
      size="m"
      weight="bold"
      color="brandPrimaryDark"
      paddingHorizontal="m"
      marginRight="s"
    >
      {moment(data).format(format === 'time' ? 'h:mm a' : 'dddd, MMMM Do')}
    </Text>
  );
};

export default DateTimeLineItem;
