import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Badge, Text } from 'ScoutDesign/library';

const Footer = ({ footerText, btnType, onPress }) => {
  return (
    <View style={styles.footer}>
      <Text color="darkGrey" size="s">
        {footerText}
      </Text>
      <Badge
        accessibilityLabel={btnType}
        color="information"
        text={btnType}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: 10,
    marginTop: 16,
    marginBottom: 10,
  },
});

export default Footer;
