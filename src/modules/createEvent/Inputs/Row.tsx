import { View, StyleSheet } from 'react-native';
import { Text } from 'ScoutDesign/library';

type Props = {
  fieldName: string;
  valid: boolean;
  children: any;
};

const Row = ({ fieldName, valid, children }: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: valid ? '#34A86C' : '#F5D03D',
          borderLeftWidth: 12,
        },
      ]}
    >
      {valid && (
        <View
          style={[
            styles.content,
            {
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginHorizontal: 28,
            },
          ]}
        >
          {fieldName ? (
            <Text
              preset="micro"
              color="brandPrimaryDark"
              paddingHorizontal="micro"
              paddingVertical="s"
            >
              {fieldName.toUpperCase()}
            </Text>
          ) : null}
        </View>
      )}

      <View style={[styles.content]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
  },
  content: {
    padding: 2,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default Row;
