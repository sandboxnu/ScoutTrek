import React from 'react';
import { createText, TextProps } from '@shopify/restyle';
import { Theme } from '../../../theme';

const TextUtility = createText<Theme>();

export type TextAlignmentWithinContainer = 'right' | 'center' | 'left';

type weights = 'bold' | 'regular' | 'light';
type sizes = 's' | 'm' | 'l';
type presets =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'subheading'
  | 'label'
  | 'label-light'
  | 'sublabel'
  | 'sublabel-light'
  | 'button'
  | 'micro';

type Props = React.ComponentProps<typeof TextUtility> & {
  accessibilityLabel?: string;
  size?: sizes;
  weight?: weights;
  preset?: presets;
} & TextProps<Theme>;

const Text = ({
  accessibilityLabel,
  size = 'm',
  weight = 'regular',
  preset,
  children,
  ...rest
}: Props) => {
  return (
    <TextUtility
      variant={preset ? preset : `${size}-${weight}`}
      nativeID={accessibilityLabel}
      {...rest}
    >
      {children}
    </TextUtility>
  );
};

export default Text;
