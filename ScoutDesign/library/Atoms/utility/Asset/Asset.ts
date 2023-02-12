import theme from '../../../theme';
import { Radius } from '../types';

export type Dimensions = {
  width?: number;
  height: number;
};

export type IconSizePresets = 'micro' | 'xs' | 's' | 'm' | 'l' | 'xl';

export type SizePresets = 'fill' | 'micro' | 'xs' | 's' | 'm' | 'l' | 'xl';

export const mapRadius = (
  radius?: Radius,
  size?: SizePresets | Dimensions
): number | undefined => {
  if (!radius) {
    return undefined;
  }

  // If a radius preset is passed to the function apply it
  if (radius !== 'circle' && radius !== 'default') {
    return theme.radii[radius];
  }

  // If size is a preset that evaluates to a number (not fill)
  else if (typeof size === 'string' && size !== 'fill') {
    if (radius === 'default') {
      return theme.radii[size];
    } else if (radius === 'circle') {
      return theme.assetSizes[size];
    }
  }

  // If size is not specified and a non-number radius preset is passed in
  // throw an error
  else if (!size) {
    console.warn(
      "You cannot pass 'circle' or 'default' if no size is specified."
    );
    return undefined;
  }

  // If size is type fill
  else if (size === 'fill') {
    if (radius === 'circle') {
      return theme.radii.xl;
    } else {
      return theme.radii.m;
    }
  }

  // If size is type Dimensions
  else {
    if (radius === 'circle') {
      if (size.height === size.width) {
        return size.height / 2;
      } else {
        return theme.radii.xl;
      }
    } else {
      return theme.radii.m;
    }
  }
};

export interface SizeProps {
  size?: SizePresets | Dimensions;
}
