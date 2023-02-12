import { View } from 'react-native';
import { Text } from 'ScoutDesign/library';
import RadioForm from 'react-native-simple-radio-button';

type Option = {
  label: string;
  value: string;
};

type Props = {
  text: string;
  initial?: number;
  a: Option;
  b: Option;
  onPress: () => void;
};

const RadioChoice = ({ text, initial, a, b, onPress }: Props) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        marginHorizontal: 4,
      }}
    >
      <Text color="darkGrey">{text}</Text>

      {/* 
      // @ts-expect-error RadioForm types don't include React elements for the label */}
      <RadioForm
        radio_props={[
          {
            label: <Text color="darkGrey">{a.label}</Text>,
            value: a.value,
          },
          {
            label: <Text color="darkGrey">{b.label}</Text>,
            value: b.value,
          },
        ]}
        buttonSize={15}
        buttonColor="#34A86C"
        selectedButtonColor="#34A86C"
        initial={initial}
        animation
        style={{ paddingTop: 18 }}
        onPress={onPress}
      />
    </View>
  );
};

export default RadioChoice;
