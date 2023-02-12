import { StackScreenProps } from '@react-navigation/stack';
import { Alert } from 'react-native';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import PasswordConfig from './components/PasswordConfig';

const CreateNewPasswordFormFields = [
  {
    name: 'password',
    rules: {
      required: 'Enter a new password',
      minLength: {
        value: 8,
        message: 'Your password should be at least 8 characters',
      },
    },
    fieldAttributes: {
      placeholder: 'Password',
      autoCapitalize: 'none',
      textContentType: 'newPassword',
      secureTextEntry: true,
    },
  },
  {
    name: 'passwordConfirm',
    rules: {
      required: 'Confirm password',
      minLength: {
        value: 8,
        message: 'Your password should be at least 8 characters',
      },
    },
    fieldAttributes: {
      placeholder: 'Confirm Password',
      autoCapitalize: 'none',
      textContentType: 'newPassword',
      secureTextEntry: true,
    },
  },
];

const CreateNewPassword = ({
  navigation,
}: StackScreenProps<AuthStackParamList, 'ResetPassword'>) => {
  const onChangePassword = (
    setSuccess: (success: boolean) => void,
    data: { password: string; passwordConfirm: string }
  ) => {
    if (data.password !== data.passwordConfirm) {
      Alert.alert(
        'Whoops, the passwords you entered do not match. Please re-enter passwords to confirm they match.'
      );
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        data.password
      )
    ) {
      // regex pattern from https://stackoverflow.com/a/21456918
      Alert.alert(
        'Your password must contain at least one uppercase letter, one lowercase letter, one number and one special character.'
      );
    } else {
      // TODO: send request to create new password
      console.log('new password: ', data.password);
      setSuccess(true);
    }
  };

  return (
    <PasswordConfig
      navigation={navigation}
      formTitle="Create New Password"
      formDescription="Your new password must be different from previous passwords. It must contain at least one uppercase letter, one lowercase letter, one number and one special character."
      formFields={CreateNewPasswordFormFields}
      handleSubmit={onChangePassword}
      successTitle="Success!"
      successDescription="Your password has been changed."
    />
  );
};

export default CreateNewPassword;
