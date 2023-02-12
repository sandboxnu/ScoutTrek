import React from 'react';
import {
  Image as RNImage,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { SpacingProps } from '@shopify/restyle';
import theme, { Theme } from '../../../../theme';
import Text from '../../Text/Text';

import {
  Pressable,
  Box,
  SizeProps,
  PressableProps,
  mapRadius,
} from '../../../utility';

export interface ImageProps extends SizeProps, PressableProps {
  accessibilityLabel: string;
  placement?: 'background' | 'foreground';
  source: ImageSourcePropType;
  title?: string;
  overlay?: 'light' | 'dark';
  PlaceholderComponent?: React.ReactElement;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  border?: boolean;
}

type Props = ImageProps & SpacingProps<Theme>;

const Image = ({
  accessibilityLabel,
  placement = 'foreground',
  source,
  title,
  overlay,
  PlaceholderComponent,
  resizeMode = 'cover',
  radius,
  size,
  border,
  ...rest
}: Props) => {
  const foreground = placement === 'foreground';
  const gradientEndColor =
    overlay === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(25, 23, 16, 0.9)';

  return (
    <Pressable
      position={foreground ? 'relative' : 'absolute'}
      zIndex={foreground ? undefined : -1}
      top={foreground ? undefined : 0}
      right={foreground ? undefined : 0}
      left={foreground ? undefined : 0}
      accessibilityLabel={accessibilityLabel}
      borderRadius={mapRadius(radius, size)}
      borderWidth={border ? 3 : undefined}
      borderColor={border ? 'mintGrey' : undefined}
      {...rest}
    >
      <Box
        width={
          size === 'fill'
            ? '100%'
            : typeof size === 'string'
            ? theme.assetSizes[size]
            : size?.width
        }
        height={
          size === 'fill'
            ? '100%'
            : typeof size === 'string'
            ? theme.assetSizes[size]
            : size?.height
        }
        borderRadius={mapRadius(radius, size)}
        overflow="hidden"
      >
        <RNImage style={StyleSheet.absoluteFillObject} source={source} />

        {title || overlay ? (
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.05)', gradientEndColor]}
            style={[
              {
                zIndex: 1,
                padding: theme.spacing.m,
                justifyContent: 'flex-end',
              },
              StyleSheet.absoluteFillObject,
            ]}
          >
            {title && (
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                accessibilityLabel={title}
                color="white"
                preset="h2"
              >
                {title}
              </Text>
            )}
          </LinearGradient>
        ) : null}
      </Box>
    </Pressable>
  );
};

export default Image;
