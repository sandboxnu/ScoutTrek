import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import PasswordConfig from './components/PasswordConfig';

const ForgotPasswordFormFields = [
  {
    name: 'email',
    rules: {
      required: 'Please enter an email',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Looks like you didn't enter a valid email.",
      },
    },
    fieldAttributes: {
      placeholder: 'Email',
      autoCapitalize: 'none',
    },
  },
];

const ForgotPassword = ({navigation}: StackScreenProps<AuthStackParamList, 'ForgotPassword'>) => {

  const onSubmitEmail = (
    setSuccess: (success: boolean) => void,
    data: {email: String}
  ) => {
    // TODO: send request to email user
    console.log('submitted email', data.email);
    setSuccess(true);
  };

  return (
    <PasswordConfig
      navigation={navigation}
      formTitle="Reset Password"
      formDescription="Enter the email associated with your account. We’ll send an email with instructions to reset your password."
      formFields={ForgotPasswordFormFields}
      handleSubmit={onSubmitEmail}
      successTitle="Email Sent!"
      successDescription="Follow the instructions in the email to reset your password."
    />
  );
};

export default ForgotPassword;
