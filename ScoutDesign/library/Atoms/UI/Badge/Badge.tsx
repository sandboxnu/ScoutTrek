import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SpacingProps } from '@shopify/restyle';
import { Theme } from '../../../theme';

import { Color, Pressable, PressableProps } from '../../utility';

import { IconPayload } from '../../../../icons';
import Icon from '../Assets/Icon/Icon';
import Text from '../Text/Text';

interface BadgeProps extends PressableProps {
  accessibilityLabel: string;
  text: string;
  icon?: IconPayload;
  color: 'gradient' | Color;
  children?: React.ReactNode;
  alignSelf?: 'flex-start';
}

type Props = BadgeProps & SpacingProps<Theme>;

const Badge = ({
  children,
  accessibilityLabel,
  onPress,
  text,
  icon,
  color,
  ...props
}: Props) => {
  return (
    <Pressable
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      borderRadius={20}
      overflow="hidden"
      position="relative"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      backgroundColor={color !== 'gradient' ? color : undefined}
      paddingVertical="xs"
      paddingHorizontal="s"
      {...props}
    >
      {color === 'gradient' && (
        <LinearGradient
          colors={['rgba(23, 161, 101, 0.095)', 'rgba(104, 237, 180, 0.065)']}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.625, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      {!!icon && icon.isValid() && (
        <Icon
          icon={icon}
          color={
            color === 'gradient'
              ? 'brandPrimaryDark'
              : color === 'white'
              ? 'darkGrey'
              : 'white'
          }
          size="xs"
        />
      )}
      <Text
        accessibilityLabel={text}
        color={
          color === 'gradient'
            ? 'brandPrimaryDark'
            : color === 'white'
            ? 'darkGrey'
            : 'white'
        }
        preset="micro"
        paddingLeft={icon ? 'xs' : undefined}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Badge;
