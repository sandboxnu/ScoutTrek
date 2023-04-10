import {useContext, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, CompositeScreenProps } from '@react-navigation/native';
import {
  Button,
  Text,
  LineItem,
  Stack,
  Container,
  ScreenContainer,
  Badge,
  Avatar,
  ImagePickerContainer,
} from 'ScoutDesign/library';
import { ScoutTrekApolloClient, GET_CURR_USER } from 'data';
import { convertRoleToText } from '../../data/utils/convertIDsToStrings';
import * as WebBrowser from 'expo-web-browser';

import { AuthContext } from '../auth/SignUp';

import { gql, useApolloClient, useQuery, useMutation } from '@apollo/client';
import { plusThin } from 'ScoutDesign/icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainBottomParamList } from '../navigation/MainTabNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/MainStackNavigator';
import { apiBaseUri } from 'data/ScoutTrekClient';

export const _updateCurrentGroup = async (groupID, navigation) => {
  await AsyncStorage.setItem('currMembershipID', groupID);
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: 'Home' }],
    })
  );
  await ScoutTrekApolloClient.resetStore();
};

const UPLOAD_PROFILE_PHOTO = gql`
  mutation UploadProfilePhoto($file: String!) {
    uploadImage(file: $file)
  }
`;

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainBottomParamList, 'Profile'>,
  StackScreenProps<MainStackParamList>
>;

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { data, error, loading } = useQuery(GET_CURR_USER);
  const client = useApolloClient();

  const { setToken } = useContext(AuthContext);

  const [uploadError, setUploadError] = useState<any>(null);
  const uploadProfilePhoto = async (data: FormData) => {
    try {
      const resp = await fetch(apiBaseUri + '/upload', {
        method: 'POST',
        body: data,
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('userToken')),
        },
      });
      const json = await resp.json();
      if (resp.status !== 200) {
        setUploadError(json.message);
      } else {
        const cache = ScoutTrekApolloClient.cache;
        const { currUser } = cache.readQuery({ query: GET_CURR_USER });
        cache.modify({
          fields: {
            currUser() {
              return { ...currUser, userPhoto: json.url };
            },
          },
        });
      }
    } catch (e) {
      setUploadError(e);
    }
  };

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      'https://scouttrek.com/#feedback'
    );
  };

  if (error) {
    console.error(error);
    return null;
  }
  if (loading) return (
    <View style={{justifyContent: 'center', flex: 1}}>
      <ActivityIndicator />
    </View>)
  

  return (
    <ScreenContainer justifyContent="space-between">
      <Container padding="none">
        <Container paddingBottom="xs">
          <Container
            alignItems="center"
            justifyContent="center"
            padding="none"
            paddingBottom="m"
          >
            <ImagePickerContainer
              error={uploadError}
              uploadImage={uploadProfilePhoto}
            >
              <Avatar
                size="xl"
                source={{
                  uri: data.currUser.userPhoto,
                }}
              />
            </ImagePickerContainer>
            <Text preset="h2" paddingTop="m">
              {data.currUser.name}
            </Text>
          </Container>

          <Container
            flexDirection="row"
            alignItems="center"
            paddingHorizontal="none"
            paddingBottom="s"
          >
            <Badge accessibilityLabel="role" color="interactive" text="Role" />
            <Text size="l" weight="bold" paddingLeft="m">
              {convertRoleToText(data.currUser.currRole)}
            </Text>
          </Container>

          {data.currUser.currPatrol && (
            <Container
              flexDirection="row"
              alignItems="center"
              paddingHorizontal="none"
              paddingTop="s"
              paddingBottom="none"
            >
              <Badge
                accessibilityLabel="role"
                color="information"
                text="Patrol"
              />
              <Text size="l" weight="bold" paddingLeft="m">
                {data.currUser.currPatrol.name}
              </Text>
            </Container>
          )}
        </Container>
        <LineItem
          accessibilityLabel="current-troop-dropdown"
          type={data.currUser.otherGroups?.length ? 'accordion' : 'static'}
          leftComponent={
            <Badge
              accessibilityLabel="role"
              color="brandSecondaryDark"
              text="Troop"
            />
          }
          accordionContent={
            <Stack
              accessibilityLabel="other-groups"
              items={[...data.currUser.otherGroups]}
              RenderItem={({ item, ...rest }) => {
                return (
                  <LineItem
                    {...rest}
                    type="button"
                    backgroundColor="lightMintGrey"
                    onPress={() => _updateCurrentGroup(item.id, navigation)}
                    accessibilityLabel={item.troopNumber}
                  >
                    <Text size="s">Switch to Troop</Text>
                    <Text preset="h2">{item.troopNumber}</Text>
                  </LineItem>
                );
              }}
            />
          }
        >
          <Text size="l" weight="bold">
            {data.currUser.currTroop.council}
          </Text>
          <Text>{data.currUser.currTroop.unitNumber}</Text>
        </LineItem>

        <Container>
          <Badge
            color="brandPrimary"
            accessibilityLabel="join-additional-troop"
            icon={plusThin}
            text="Connect Additional Troop"
            alignSelf="flex-start"
            onPress={() => navigation.navigate('JoinGroup')}
          />
        </Container>
        <Button
          accessibilityLabel="link-to-suggest-a-feature"
          text="Suggest a Feature"
          textColor="interactiveDark"
          backgroundColor="white"
          onPress={_handlePressButtonAsync}
        />
      </Container>

      <Container paddingHorizontal="none">
        <Button
          accessibilityLabel="logout"
          textColor="darkGrey"
          backgroundColor="white"
          text="Logout"
          onPress={async () => {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('currMembershipID');
            setToken('');
            client.stop();
            await client.clearStore();
          }}
        />
      </Container>
    </ScreenContainer>
  );
};

export default ProfileScreen;
