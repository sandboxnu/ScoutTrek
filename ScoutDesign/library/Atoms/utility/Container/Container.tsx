import theme, { Theme } from '../../../theme';
import Box from '../Box/Box';
import { RadiusProps } from '../types';
import { mapRadius, SizeProps } from '../Asset/Asset';
import {
  SpacingProps,
  LayoutProps,
  PositionProps,
  BorderProps,
  BackgroundColorProps,
  ShadowProps,
} from '@shopify/restyle';
import { StackableProps } from '../../../Widgets/Stack/Stack';

interface ContainerProps extends StackableProps, SizeProps, RadiusProps {
  accessibilityLabel?: string;
  key?: string;
  children: any;
}

type Props = SpacingProps<Theme> &
  LayoutProps<Theme> &
  PositionProps<Theme> &
  ShadowProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  ContainerProps;

const Container = ({
  accessibilityLabel,
  key,
  topLeftRadius,
  topRightRadius,
  bottomRightRadius,
  bottomLeftRadius,
  radius,
  children,
  isStackTop,
  isStackBottom,
  stackRadius,
  padding = 'm',
  size,
  ...rest
}: Props) => {
  return (
    <Box
      width={
        size === 'fill'
          ? '100%'
          : typeof size === 'string'
          ? theme.assetSizes[size]
          : !size
          ? undefined
          : size.width
      }
      height={
        size === 'fill'
          ? '100%'
          : typeof size === 'string'
          ? theme.assetSizes[size]
          : !size
          ? undefined
          : size.height
      }
      {...rest}
      key={key}
      padding={padding}
      borderRadius={mapRadius(radius, size)}
      borderTopLeftRadius={
        isStackTop ? mapRadius(stackRadius) : mapRadius(topLeftRadius)
      }
      borderTopRightRadius={
        isStackTop ? mapRadius(stackRadius) : mapRadius(topRightRadius)
      }
      borderBottomLeftRadius={
        isStackBottom ? mapRadius(stackRadius) : mapRadius(bottomLeftRadius)
      }
      borderBottomRightRadius={
        isStackBottom ? mapRadius(stackRadius) : mapRadius(bottomRightRadius)
      }
      testID={accessibilityLabel}
      nativeID={accessibilityLabel}
    >
      {children}
    </Box>
  );
};

export default Container;
