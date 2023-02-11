import { Fragment } from 'react';
import Button from '../../Atoms/UI/Buttons/Button';
import TextInput from '../../Atoms/FormFields/TextInput/SimpleTextInput';
import { useForm, Controller } from 'react-hook-form';
import { Container, Box, StandardRadius, Color } from '../../Atoms/utility';

type Props = {
  formFields: any[];
  onSubmit: (data: any) => void;
  submitBtnText: string;
  accessibilityLabel: string;
  borderColor?: Color;
  backgroundColor?: Color;
  radius?: StandardRadius;
  HeaderComponent?: React.FC<any>;
};

const Form = ({
  formFields,
  onSubmit,
  submitBtnText,
  accessibilityLabel,
  borderColor,
  backgroundColor,
  radius,
  HeaderComponent,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: formFields.reduce(
      (acc, val) => ({
        ...acc,
        [val.name]: '',
      }),
      {}
    ),
  });

  return (
    <>
      <Container
        padding="none"
        accessibilityLabel={accessibilityLabel}
        borderWidth={1}
        borderColor={borderColor}
        borderTopWidth={HeaderComponent ? 0 : undefined}
        borderBottomWidth={0}
        backgroundColor={backgroundColor}
        topRightRadius={HeaderComponent ? undefined : radius}
        topLeftRadius={HeaderComponent ? undefined : radius}
      >
        {formFields.map((field, index) => {
          const firstItem = index === 0;
          return (
            <Fragment key={field.name}>
              {!firstItem && !errors[field.name] && (
                <Box backgroundColor={backgroundColor} height={1}>
                  <Box
                    flex={1}
                    marginHorizontal="l"
                    backgroundColor={borderColor}
                  />
                </Box>
              )}
              <Controller
                control={control}
                rules={field.rules}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    {...field.fieldAttributes}
                    noStyles
                    onBlur={onBlur}
                    error={errors[field.name]}
                    onValueChange={onChange}
                    value={value}
                  />
                )}
                name={field.name}
              />
            </Fragment>
          );
        })}
      </Container>
      <Button
        isStackBottom
        stackRadius={radius}
        onPress={handleSubmit(onSubmit)}
        accessibilityLabel="sign-up"
        text={submitBtnText}
        backgroundColor="brandPrimary"
        fullWidth
      />
    </>
  );
};

export default Form;
