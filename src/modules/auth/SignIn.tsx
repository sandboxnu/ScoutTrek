import { useContext } from 'react';
import {
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { Text, Form, Image } from 'ScoutDesign/library';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { gql, useMutation } from '@apollo/client';
import Footer from './components/Footer';
import { AuthContext } from '../auth/SignUp';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';

const LOG_IN = gql`
  mutation Login($userInfo: LoginInput!) {
    login(input: $userInfo) {
      token
      groupID
      noGroups
    }
  }
`;

const SignInFormFields = [
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
  {
    name: 'password',
    rules: {
      required: 'Please enter your password for this account',
      minLength: {
        value: 8,
        message: 'Your password is not long enough yet',
      },
    },
    fieldAttributes: {
      placeholder: 'Password',
      autoCapitalize: 'none',
      secureTextEntry: true,
    },
  },
];

const SignIn = ({
  navigation,
}: StackScreenProps<AuthStackParamList, 'SignIn'>) => {
  const { setToken } = useContext(AuthContext);

  const [logIn] = useMutation(LOG_IN, {
    onCompleted: async (data) => {
      try {
        const token = await AsyncStorage.setItem('userToken', data.login.token);
        const groupID = await AsyncStorage.setItem(
          'currMembershipID',
          data.login.groupID || undefined
        );
        setToken(data.login.token);
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleSignIn = async (data: any) => {
    await logIn({
      variables: {
        userInfo: {
          email: data.email,
          password: data.password,
          expoNotificationToken: '',
        },
      },
    }).catch((error) => console.log('An error', error));
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Image
        accessibilityLabel="sign-up-background"
        placement="background"
        overlay="light"
        size={{
          height: Dimensions.get('window').height * 0.8,
        }}
        source={{
          uri: 'https://res.cloudinary.com/wow-your-client/image/upload/v1581455286/ScoutTrek/adventure-alps-backpack_2x.png',
        }}
      />
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingHorizontal: 12,
          marginBottom: 12,
        }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <Text marginBottom="m" textAlign="center" preset="h2">
          Welcome back!
        </Text>
        <Form
          formFields={SignInFormFields}
          accessibilityLabel="signup-form"
          radius="l"
          borderColor="mediumGrey"
          backgroundColor="white"
          onSubmit={handleSignIn}
          submitBtnText="Sign In"
        />
        <Text
          color="darkGrey"
          size="s"
          style={{
            width: '100%',
            paddingHorizontal: 12,
            paddingTop: 6,
            textAlign: 'right',
          }}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          Forgot Password?
        </Text>
        <Footer
          footerText="Don&rsquo;t have an account?"
          btnType="Sign Up Now"
          onPress={() => navigation.navigate('SignUp')}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignIn;
