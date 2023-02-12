import { useState } from 'react';
import {
  ScreenContainer,
  Button,
  Container,
  Text,
  TextInputWithButton,
} from 'ScoutDesign/library';
import { plusBold } from 'ScoutDesign/icons';
import {
  addChildren,
  useJoinGroupForm,
} from './JoinGroupForm/JoinGroupFormStore';
import { StackScreenProps } from '@react-navigation/stack';
import { JoinGroupStackParamList } from '../navigation/JoinGroupNavigator';

const AddChildren = ({
  navigation,
}: StackScreenProps<JoinGroupStackParamList>) => {
  const [_, dispatch] = useJoinGroupForm() || [null, null];
  const [childName, setChildName] = useState('');
  const [children, setChildren] = useState<string[]>([]);
  const [childNameIsValid, setChildNameIsValid] = useState(false);

  const next = () => {
    dispatch && dispatch(addChildren(children));
    navigation.navigate('JoinPatrol');
  };

  return (
    <ScreenContainer>
      <Container>
        <Text preset="h2" paddingHorizontal="s">
          What are the names of the Scouts who belong to you?
        </Text>

        <TextInputWithButton
          placeholder="First & Last Name"
          onValueChange={(value) => {
            setChildName(value.toString());
            if (value.toString().length > 2) {
              setChildNameIsValid(true);
            } else {
              setChildNameIsValid(false);
            }
          }}
          value={childName}
          buttonText="Add"
          buttonIcon={plusBold}
          buttonColor="brandSecondary"
          disabled={!childNameIsValid}
          onPress={() => {
            setChildName('');
            setChildren([...children, childName]);
            setChildNameIsValid(false);
          }}
        />

        {!!children.length && (
          <Container padding="s">
            <Text size="l" weight="bold" paddingBottom="micro">
              Your Scouts
            </Text>
            {children.map((child) => (
              <Text
                key={child}
                size="l"
                paddingVertical="xs"
                paddingHorizontal="s"
              >
                {child}
              </Text>
            ))}
          </Container>
        )}
        {children.length ? (
          <Container paddingTop="l" paddingHorizontal="none">
            <Button
              accessibilityLabel="next-join-patrol"
              onPress={next}
              text="Finished Adding Scouts"
              fullWidth
            />
          </Container>
        ) : null}
      </Container>
    </ScreenContainer>
  );
};

export default AddChildren;
