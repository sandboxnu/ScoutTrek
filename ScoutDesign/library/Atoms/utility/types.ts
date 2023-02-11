import theme from '../../theme';

export type StandardRadius = 'micro' | 'xs' | 's' | 'm' | 'l' | 'xl';

export type ExtendedRadius =
  | 'default'
  | 'circle'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl';

export type Radius = StandardRadius | ExtendedRadius;

export interface RadiusProps {
  radius?: Radius;
  topRightRadius?: StandardRadius;
  topLeftRadius?: StandardRadius;
  bottomRightRadius?: StandardRadius;
  bottomLeftRadius?: StandardRadius;
}

export type Color = keyof typeof theme.colors;
export type Spacing = keyof typeof theme.spacing;
export type AssetSizePreset = keyof typeof theme.assetSizes;

export type Modify<T, R> = Omit<T, keyof R> & R;
