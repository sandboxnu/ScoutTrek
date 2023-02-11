import Slider from '@react-native-community/slider';
import { View, StyleSheet } from 'react-native';
import { Text } from 'ScoutDesign/library';

type Props = {
  distance: number;
  setDistance: React.Dispatch<any>;
  min: number;
  max: number;
};

const CustomSlider = ({ distance, setDistance, min, max }: Props) => {
  return (
    <View style={styles.sliderContainer}>
      <Text preset="h2">{distance}</Text>

      <View style={styles.sliderRow}>
        <Slider
          minimumValue={min}
          maximumValue={max}
          style={{ flex: 1 }}
          step={1}
          value={distance}
          onValueChange={setDistance}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderRow: {
    flexDirection: 'row',
  },
});

export default CustomSlider;
