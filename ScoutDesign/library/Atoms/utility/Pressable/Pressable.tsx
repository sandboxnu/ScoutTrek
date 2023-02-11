import { Pressable as RNPressable, View } from 'react-native';
import { Theme } from '../../../theme';
import Box from '../Box/Box';
import { RadiusProps } from '../types';
import { mapRadius } from '../Asset/Asset';
import {
  useRestyle,
  spacing,
  border,
  layout,
  position,
  shadow,
  backgroundColor,
  SpacingProps,
  LayoutProps,
  PositionProps,
  BorderProps,
  BackgroundColorProps,
  ShadowProps,
  composeRestyleFunctions,
} from '@shopify/restyle';

export interface PressableProps extends RadiusProps {
  disabled?: boolean;
  disabledStyle?: any;
  onPress?: (nativeEvent: any) => void;
  onLongPress?: (nativeEvent: any) => void;
  sideEffect?: () => void;
}

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  PositionProps<Theme> &
  ShadowProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme>;

type Props = RestyleProps &
  PressableProps & {
    accessibilityLabel: string;
    key?: string;
    children: any;
  };

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  position,
  layout,
  backgroundColor,
  shadow,
]);

const PressableBase = ({
  accessibilityLabel,
  key,
  disabled = false,
  disabledStyle,
  onPress,
  onLongPress,
  sideEffect,
  topLeftRadius,
  topRightRadius,
  bottomRightRadius,
  bottomLeftRadius,
  radius,
  children,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  if (!onPress && !onLongPress && !sideEffect) {
    return (
      <Box
        {...rest}
        key={key}
        testID={accessibilityLabel}
        nativeID={accessibilityLabel}
      >
        {children}
      </Box>
    );
  }

  return (
    <RNPressable
      key={key}
      onPress={sideEffect || onPress}
      onLongPress={onLongPress}
      hitSlop={8}
      disabled={disabled}
      testID={accessibilityLabel}
      nativeID={accessibilityLabel}
      style={({ pressed }: { pressed: boolean }) => [
        disabled ? disabledStyle : undefined,
        { opacity: pressed && !sideEffect ? 0.4 : 1 },
      ]}
    >
      {({ pressed }) => <View {...props}>{children}</View>}
    </RNPressable>
  );
};

const Pressable = (props: Props) => {
  return (
    <PressableBase
      borderTopLeftRadius={mapRadius(props?.topLeftRadius)}
      borderTopRightRadius={mapRadius(props?.topRightRadius)}
      borderBottomLeftRadius={mapRadius(props?.bottomLeftRadius)}
      borderBottomRightRadius={mapRadius(props?.bottomRightRadius)}
      borderRadius={mapRadius(props?.radius)}
      {...props}
    >
      {props.children}
    </PressableBase>
  );
};

export default Pressable;
