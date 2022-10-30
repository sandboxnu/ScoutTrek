import moment from 'moment';
import {Text} from 'ScoutDesign/library';

type Props = {
  data: any;
  format: 'date' | 'time' | 'datetime';
};

const formats = {
  'time': 'h:mm a',
  'date': 'dddd, MMMM Do',
  'datetime': 'dddd, MMMM Do[\n]h:mm a'
}

// @todo - create more scalable type for data display completed components
const DateTimeLineItem = ({data, format}: Props) => {
  return (
    <Text
      size="m"
      weight="bold"
      color="brandPrimaryDark"
      paddingHorizontal="m"
      marginRight="s">
      {moment(data).format(formats[format])}
    </Text>
  );
};

export default DateTimeLineItem;
