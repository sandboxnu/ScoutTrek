import {useReducer} from 'react';
import {Dimensions, View} from 'react-native';
import {
  Button,
  Container,
  ScreenContainer,
  Text,
  TextInput,
} from 'ScoutDesign/library';
import {Picker} from '@react-native-picker/picker';
import {gql, useMutation} from '@apollo/client';
import {
  useJoinGroupForm,
  chooseGroup,
} from '../JoinGroupForm/JoinGroupFormStore';

const STATES = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Island',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const ADD_TROOP = gql`
  mutation AddTroop($troopInfo: AddTroopInput) {
    addTroop(input: $troopInfo) {
      id
      unitNumber
    }
  }
`;

export const formReducer = (state, action) => {
  if (action.type === 'UPDATE_INPUT_FIELD') {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    return {
      inputValues: updatedValues,
    };
  }
};

const CreateTroop = ({navigation}) => {
  const [_, dispatch] = useJoinGroupForm();
  const [addTroop] = useMutation(ADD_TROOP, {
    onCompleted: (data) => {
      dispatch(chooseGroup(data.addTroop.id, data.addTroop.unitNumber));
      navigation.navigate('ChooseRole');
    },
  });

  const [formState, dispatchFormChange] = useReducer(formReducer, {
    inputValues: {
      council: '',
      state: '',
      city: '',
      unitNumber: '',
    },
  });

  const handleInputChange = (inputIdentifier: string, value: any) => {
    dispatchFormChange({
      type: 'UPDATE_INPUT_FIELD',
      value: value,
      input: inputIdentifier,
    });
  };

  const nextForm = async () => {
    await addTroop({
      variables: {
        troopInfo: {
          council: formState.inputValues.council,
          state: formState.inputValues.state,
          city: formState.inputValues.city,
          unitNumber: +formState.inputValues.unitNumber,
        },
      },
    });
  };

  return (
    <ScreenContainer>
      <Container>
        <Text weight="bold" paddingVertical="s">
          What is the name of your Troop council?
        </Text>
        <TextInput
          onValueChange={(value) => handleInputChange('council', value)}
          value={formState.inputValues.council}
          placeholder="Council Name"
        />

        <Text weight="bold" paddingVertical="s">
          What state do you live in?
        </Text>
        <View style={{alignItems: 'center'}}>
          <Picker
            style={{
              width: (Dimensions.get('window').width * 4) / 5,
            }}
            selectedValue={formState.inputValues.state}
            onValueChange={(value) => handleInputChange('state', value)}
            onSelect={(value) => {
              handleInputChange('state', value);
            }}>
            {STATES.map((state) => (
              <Picker.Item key={state} label={state} value={state} />
            ))}
          </Picker>
        </View>

        <Text weight="bold" paddingVertical="s">
          What city is your Troop in?
        </Text>
        <TextInput
          onValueChange={(value) => handleInputChange('city', value)}
          value={formState.inputValues.city}
          placeholder="City"
        />
        <Text weight="bold" paddingVertical="s">
          What is your Troop number?
        </Text>
        <TextInput
          onValueChange={(value) => handleInputChange('unitNumber', value)}
          value={formState.inputValues.unitNumber}
          placeholder=""
        />

        <Container padding="none" paddingTop="m">
          <Button
            accessibilityLabel="create-troop"
            text="Create Troop"
            onPress={nextForm}
            fullWidth
          />
        </Container>
      </Container>
    </ScreenContainer>
  );
};

export default CreateTroop;
