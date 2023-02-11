import TextInputBase, { TextInputProps } from './TextInputBase';
import Button from '../../UI/Buttons/Button';
import Container from '../../utility/Container/Container';
import { Color, PressableProps } from '../../utility';
import { IconPayload } from '../../../../icons';
import theme from 'ScoutDesign/library/theme';

type Props = TextInputProps &
  PressableProps & {
    disabled?: boolean;
    buttonColor?: Color;
    buttonText: string;
    buttonIcon?: IconPayload;
  };

const TextInputWithButton = ({
  disabled,
  error,
  buttonColor,
  buttonText,
  buttonIcon,
  onPress,
  ...props
}: Props) => {
  return (
    <Container
      paddingHorizontal="none"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <TextInputBase
        borderWidth={0.5}
        borderColor={
          disabled ? 'mediumGrey' : error ? 'danger' : 'brandPrimary'
        }
        radius={undefined}
        topLeftRadius="l"
        bottomLeftRadius="l"
        style={{ flex: 1, fontSize: 17 }}
        {...props}
      />
      <Button
        accessibilityLabel={buttonText}
        icon={buttonIcon}
        text={buttonText}
        onPress={onPress}
        backgroundColor={buttonColor}
        radius={undefined}
        topRightRadius="l"
        disabled={disabled}
        bottomRightRadius="l"
        tall
      />
    </Container>
  );
};

export default TextInputWithButton;
