import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {
  IconSizePresets,
  Color,
  mapRadius,
  Pressable,
  PressableProps,
  Spacing,
  Radius,
} from '../../utility';
import Icon from '../Assets/Icon/Icon';
import Text from '../Text/Text';
import { IconPayload } from '../../../../icons';

export interface ButtonProps extends PressableProps {
  accessibilityLabel: string;
  text?: string;
  textColor?: Color;
  backgroundColor?: Color | 'gradient';
  icon?: IconPayload;
}

type Props = ButtonProps & {
  alignSelf?: 'flex-start';
  paddingVertical: Spacing;
  paddingHorizontal: Spacing;
  radius?: Radius;
  textPadding?: Spacing;
  iconPadding: Spacing;
  iconSize: IconSizePresets;
  children?: any;
};

const Button = ({
  accessibilityLabel,
  onPress,
  text,
  icon,
  backgroundColor = 'brandPrimary',
  textColor = 'white',
  radius,
  textPadding,
  iconPadding,
  iconSize,
  children,
  disabled,
  ...props
}: Props) => {
  const gradient = backgroundColor === 'gradient';
  if (gradient) textColor = 'brandPrimaryDark';
  const bgColor = gradient
    ? undefined
    : disabled
    ? 'mediumGrey'
    : backgroundColor;

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      onPress={disabled ? undefined : onPress}
      backgroundColor={bgColor}
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
      overflow="hidden"
      borderRadius={mapRadius(radius)}
      disabled={disabled}
      {...props}
    >
      {gradient && (
        <LinearGradient
          colors={['rgba(23, 161, 101, 0.095)', 'rgba(104, 237, 180, 0.065)']}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.625, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      )}

      {!!icon && icon.isValid() && (
        <Icon icon={icon} color={textColor} size={iconSize} />
      )}
      {children ? (
        children
      ) : (
        <Text
          accessibilityLabel="button-text"
          color={textColor}
          preset="button"
          padding={textPadding}
          paddingLeft={icon ? iconPadding : undefined}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
