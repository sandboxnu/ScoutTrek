import { StackNavigationProp } from '@react-navigation/stack';
import {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {Text, Form, Container, ScreenContainer} from 'ScoutDesign/library';
import { AuthStackParamList } from 'src/modules/navigation/AuthNavigator';

type ForgotPasswordProps = {
  formTitle: string,
  formDescription: string,
  formFields: any[],
  handleSubmit: (setSuccess: (s: boolean) => void, data: any) => void,
  successTitle: string,
  successDescription: string,
  navigation: StackNavigationProp<AuthStackParamList, "ForgotPassword"> | StackNavigationProp<AuthStackParamList, "ResetPassword"> 
}


const ForgotPassword = ({
  navigation,
  formTitle,
  formDescription,
  formFields,
  handleSubmit,
  successTitle,
  successDescription,
}: ForgotPasswordProps) => {

  const [success, setSuccess] = useState(false);

  return (
    <ScreenContainer back={() => navigation.goBack()} icon="back">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="handled">
        {success ? (
          <>
            <Container flexGrow={4} justifyContent="center">
              <Text marginBottom="m" textAlign="center" preset="h2">
                {successTitle}
              </Text>
              <Text
                color="darkGrey"
                size="s"
                textAlign="center"
                style={{marginBottom: 60, fontSize: 16}}>
                {successDescription}
              </Text>
            </Container>
            <Text
              color="brandPrimary"
              weight="bold"
              textAlign="center"
              style={{flexGrow: 1}}
              onPress={() => navigation.goBack()}>
              Back to Log In
            </Text>
          </>
        ) : (
          <KeyboardAvoidingView
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <Text marginBottom="m" textAlign="center" preset="h2">
              {formTitle}
            </Text>
            <Text
              color="darkGrey"
              size="s"
              textAlign="center"
              style={{marginBottom: 60, fontSize: 16}}>
              {formDescription}
            </Text>
            <Form
              formFields={formFields}
              accessibilityLabel="forgot-password-form"
              radius="l"
              borderColor="mediumGrey"
              backgroundColor="white"
              onSubmit={(data) => handleSubmit(setSuccess, data)}
              submitBtnText="Reset Password"
            />
          </KeyboardAvoidingView>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

export default ForgotPassword;
