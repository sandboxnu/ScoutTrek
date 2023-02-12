import theme, { Theme } from '../../../../theme';
import {
  Pressable,
  IconSizePresets,
  PressableProps,
  Color,
} from '../../../utility';
import { Box } from '../../../utility';
import { SpacingProps } from '@shopify/restyle';

import { IconPayload } from '../../../../../icons';

interface IconProps extends PressableProps {
  icon: IconPayload;
  size: IconSizePresets;
  color: Color;
  backgroundColor?: Color;
  badge?: boolean;
}

type Props = IconProps & SpacingProps<Theme>;

const Icon = ({
  radius,
  icon,
  size,
  color,
  backgroundColor,
  badge,
  ...rest
}: Props) => {
  if (typeof size !== 'string') {
    console.error('Icon can only use size presets, not custom dimensions.');
    return null;
  } else {
    return (
      <Pressable
        accessibilityLabel={icon.name}
        borderRadius={30}
        borderColor={backgroundColor ? 'mediumGrey' : undefined}
        borderWidth={backgroundColor ? 0.25 : undefined}
        backgroundColor={backgroundColor ? backgroundColor : undefined}
        padding={backgroundColor ? 'icon' : undefined}
        justifyContent="center"
        alignItems="center"
        {...rest}
      >
        <icon.component
          name={icon.name}
          size={
            backgroundColor
              ? theme.assetSizes[size] - theme.spacing.icon
              : theme.assetSizes[size]
          }
          color={color ? theme.colors?.[color] : undefined}
        />
        {badge ? (
          <Box
            borderRadius={13}
            backgroundColor="danger"
            position="absolute"
            top={0}
            right={0}
            style={{ width: 13, height: 13 }}
          />
        ) : undefined}
      </Pressable>
    );
  }
};

export default Icon;
