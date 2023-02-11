import TextInputBase, { TextInputProps } from './TextInputBase';

type Props = TextInputProps;

const ColorfulTextInput = ({ disabled, error, ...props }: Props) => {
  return (
    <TextInputBase
      borderRadius={7}
      borderWidth={0.5}
      borderBottomWidth={4}
      borderBottomColor={
        disabled ? 'mediumGrey' : error ? 'danger' : 'brandPrimary'
      }
      borderBottomLeftRadius={0}
      borderBottomRightRadius={0}
      {...props}
    />
  );
};

export default ColorfulTextInput;
