import ButtonBase, { ButtonProps } from './ButtonBase';

import { StackableProps } from '../../../Widgets/Stack/Stack';

type Props = ButtonProps &
  StackableProps & {
    text: string;
    fullWidth?: boolean;
    tall?: boolean;
  };

const Button = ({
  fullWidth,
  isStackBottom,
  isStackTop,
  stackRadius,
  tall,
  ...rest
}: Props) => {
  return (
    <ButtonBase
      alignSelf={fullWidth ? undefined : 'flex-start'}
      paddingVertical={tall ? 'm' : 's'}
      paddingHorizontal={tall ? 'm' : 'l'}
      radius={stackRadius ? undefined : 'xl'}
      topRightRadius={isStackTop ? stackRadius : undefined}
      topLeftRadius={isStackTop ? stackRadius : undefined}
      bottomRightRadius={isStackBottom ? stackRadius : undefined}
      bottomLeftRadius={isStackBottom ? stackRadius : undefined}
      iconPadding="s"
      iconSize="xs"
      {...rest}
    />
  );
};

export default Button;
