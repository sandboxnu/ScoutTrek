import {gql, useQuery} from '@apollo/client';
import {
  Container,
  Text,
  Button,
  Stack,
  ScreenContainer,
} from 'ScoutDesign/library';
import { View } from "react-native";
import {plusBold} from 'ScoutDesign/icons';
import {
  chooseGroup,
  useJoinGroupForm,
} from './JoinGroupForm/JoinGroupFormStore';

const GET_TROOPS = gql`
  query GetTroops {
    troops {
      id
      unitNumber
      council
      state
    }
  }
`;

const JoinTroop = ({navigation}) => {
  const [_, dispatch] = useJoinGroupForm();
  const {data, error, loading} = useQuery(GET_TROOPS, {
    fetchPolicy: 'network-only',
  });

  const nextForm = (troopID: string, troopNumber: string) => {
    dispatch(chooseGroup(troopID, troopNumber));
    navigation.navigate('ChooseRole');
  };

  if (loading) return null;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  return (
    <ScreenContainer>
      <Container>
        <Text preset="h2" textAlign="center" padding="m">
          What Troop are you in?
        </Text>
        <Stack
          accessibilityLabel="test-stack"
          radius="l"
          items={data.troops}
          everyItemProps={{
            fullWidth: true,
            justifyContent: 'flex-start',
            paddingVertical: 'm',
          }}
          RenderItem={({item, ...rest}) => {
            return (
              <Button
                accessibilityLabel={item.id}
                onPress={() => nextForm(item.id, item.unitNumber)}
                text={`Troop ${item.unitNumber} of ${item.council} council`}
                {...rest}
              />
            );
          }}
        />

        <View
          style={{
            marginTop: 20
          }}>
          <Button
            accessibilityLabel="create-new-troop"
            text="Create Troop"
            backgroundColor="brandSecondary"
            icon={plusBold}
            onPress={() => {
              navigation.navigate('CreateTroop');
            }}
            fullWidth={true}
            tall={true}
          />
        </View>
      </Container>
    </ScreenContainer>
  );
};

export default JoinTroop;
