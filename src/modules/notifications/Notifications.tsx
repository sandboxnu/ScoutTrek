import { ActivityIndicator } from 'react-native';
import { ScreenContainer, Container, Card, Text } from 'ScoutDesign/library';
import { useQuery, useMutation, gql } from '@apollo/client';

import { checkmark } from 'ScoutDesign/icons';
import moment from 'moment';

import { GET_CURR_USER } from 'data';
import { MainStackParamList } from '../navigation/MainStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';

export const DISMISS_NOTIFICATION = gql`
  mutation DismissNotificaion($id: ID!) {
    dismissNotification(id: $id)
  }
`;

const Notifications = ({
  navigation,
}: StackScreenProps<MainStackParamList, 'Notifications'>) => {
  const { data, error, loading } = useQuery(GET_CURR_USER);
  const [dismissNotification] = useMutation(DISMISS_NOTIFICATION, {
    refetchQueries: [GET_CURR_USER],
  });

  if (error) {
    console.error(error);
    return null;
  }
  if (loading) return <ActivityIndicator />;

  return (
    <ScreenContainer marginTop="xl" icon="back" back={navigation.goBack}>
      <Container>
        {data.currUser?.unreadNotifications?.length ? (
          <>
            <Text paddingBottom="s" preset="h1">
              Notifications
            </Text>
            {data.currUser?.unreadNotifications.map(
              ({
                id,
                title,
                createdAt,
                eventID,
              }: {
                id: number;
                title: string;
                createdAt: number;
                eventID: number;
              }) => {
                return (
                  <Card
                    key={id}
                    accessibilityLabel={title}
                    onPress={() => {
                      // @todo remove expired local notifications on the server side
                      // This may fail because I'm not currently deleting old events or old notifications so it's possible that there may be a notification for an event that has passed.
                      try {
                        navigation.navigate('ViewEvent', {
                          currItem: eventID,
                        });
                        dismissNotification({ variables: { id } });
                      } catch {
                        dismissNotification({ variables: { id } });
                      }
                    }}
                    headerLeft={
                      <Text weight="light">
                        {moment(createdAt).format('hh:mm a')}
                      </Text>
                    }
                    dismissComponent={checkmark}
                    onDismiss={() => {
                      dismissNotification({ variables: { id } });
                    }}
                    borderBelowHeader
                  >
                    <Text preset="label-light" paddingVertical="s">
                      {title}
                    </Text>
                  </Card>
                );
              }
            )}
          </>
        ) : (
          <Text textAlign="center">No notifications</Text>
        )}
      </Container>
    </ScreenContainer>
  );
};

export default Notifications;
