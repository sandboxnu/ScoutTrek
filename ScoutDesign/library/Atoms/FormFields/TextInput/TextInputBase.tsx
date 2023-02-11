import { TextInputProps as RNTextInputProps } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import TextInput, {
  TextInputUtilityProps,
} from '../../utility/TextInput/TextInput';
import { FormFieldProps } from '../formTypes';
import { StackableProps } from '../../../Widgets/Stack/Stack';
import theme from '../../../theme';

export interface TextInputProps
  extends FormFieldProps,
    RNTextInputProps,
    StackableProps {
  placeholder?: string;
  noStyles?: boolean;
}

type BaseTextInputProps = TextInputUtilityProps &
  StackableProps &
  TextInputProps;

const BaseTextInput = ({
  onValueChange,
  disabled,
  error,
  noStyles,
  isStackBottom,
  isStackTop,
  stackRadius,
  ...props
}: BaseTextInputProps) => {
  const backgroundColor = disabled
    ? 'lightMintGrey'
    : error
    ? 'lightRedGrey'
    : noStyles
    ? undefined
    : 'white';

  const borderColor = disabled ? 'mediumGrey' : error ? 'danger' : 'mintGrey';

  return (
    <TextInput
      radius="m"
      topRightRadius={isStackTop ? stackRadius : undefined}
      topLeftRadius={isStackTop ? stackRadius : undefined}
      bottomRightRadius={isStackBottom ? stackRadius : undefined}
      bottomLeftRadius={isStackBottom ? stackRadius : undefined}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      paddingVertical="m"
      paddingHorizontal="l"
      onChangeText={onValueChange}
      placeholderTextColor={theme.colors.morningGrey}
      editable={!disabled}
      style={styles.input}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 17,
  },
});

export default BaseTextInput;
