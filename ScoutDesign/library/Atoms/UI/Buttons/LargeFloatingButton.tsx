import ButtonBase, { ButtonProps } from './ButtonBase';

import Text from '../Text/Text';
import { Floatable, FloatableProps } from '../../utility';

type Props = ButtonProps & FloatableProps;

const LargeFloatingButton = ({
  text,
  textColor = 'white',
  corner,
  distanceFromCorner,
  ...rest
}: Props) => {
  return (
    <Floatable corner={corner} distanceFromCorner={distanceFromCorner}>
      <ButtonBase
        paddingVertical="s"
        paddingHorizontal="m"
        radius="xl"
        iconPadding="s"
        iconSize="m"
        {...rest}
      >
        <Text
          accessibilityLabel="button-text"
          color={textColor}
          size="l"
          weight="bold"
          padding="xs"
          paddingLeft={rest.icon ? 's' : undefined}
        >
          {text}
        </Text>
      </ButtonBase>
    </Floatable>
  );
};

export default LargeFloatingButton;
