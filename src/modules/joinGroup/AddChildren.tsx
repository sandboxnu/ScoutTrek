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

const AddChildren = ({ navigation }) => {
  const [_, dispatch] = useJoinGroupForm();
  const [childName, setChildName] = useState('');
  const [children, setChildren] = useState([]);
  const [childNameIsValid, setChildNameIsValid] = useState(false);

  const next = () => {
    dispatch(addChildren(children));
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
            setChildName(value);
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
