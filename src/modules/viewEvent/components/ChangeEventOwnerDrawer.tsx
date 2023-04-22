import { ApolloQueryResult, gql, useMutation, useQuery } from '@apollo/client';
import { searchThin } from 'ScoutDesign/icons';
import { Button, Icon } from 'ScoutDesign/library';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Modal } from 'react-native';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

const UPDATE_EVENT_CREATOR = gql`
  mutation UpdateEvent($input: UpdateEventInput!) {
    updateEvent(input: $input) {
      creator
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    display: 'flex',
  },
  title: {
    color: '#232323',
  },
  avatar: {
    backgroundColor: 'lightgreen',
    color: 'white',
    height: 25,
    width: 25,
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  searchbarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchbar: {},
  userTile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  selected: {},
  actionContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

interface Props {
  visible: boolean;
  eventOwnerName: string;

  onClose: () => void;
  onRefetch: (
    variables?:
      | Partial<{
          id: any;
        }>
      | undefined
  ) => Promise<ApolloQueryResult<any>>;
}

const ChangeEventOwnerDrawer: React.FC<Props> = ({
  visible,
  eventOwnerName,
  onClose,
  onRefetch,
}) => {
  const [text, setText] = useState<string>('');
  const [selectedNewOwnerId, setSelectedNewOwnerId] = useState<string | null>(
    null
  );

  const { data: searchData, loading: searchLoading } = useQuery(GET_USERS);

  const [updateEvent] = useMutation(UPDATE_EVENT_CREATOR);

  const searchResults: Array<{ id: string; name: string }> = useMemo(
    () =>
      searchLoading
        ? []
        : searchData.users.filter(
            ({ name }: { name: string }) => name.indexOf(text) > -1
          ),
    [searchData, text]
  );

  const getInitials = useCallback((name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('');
  }, []);

  const onChangeText = useCallback((text: string) => {
    setText(text);
  }, []);

  const onNewOwnerSelect = useCallback((id: string) => {
    setSelectedNewOwnerId(id);
  }, []);

  const onCancel = useCallback(() => {
    setText('');
    setSelectedNewOwnerId(null);
    onClose();
  }, []);

  const onConfirm = useCallback(async () => {
    await updateEvent({
      variables: {
        input: {
          creator: selectedNewOwnerId,
        },
      },
    });

    await onRefetch();

    onCancel();
  }, []);

  if (searchLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Event Owner</Text>
        <Text style={styles.avatar}>{getInitials(eventOwnerName)}</Text>
        <Text style={styles.name}>{eventOwnerName}</Text>
        <View style={styles.searchbarContainer}>
          <Icon icon={searchThin} size="s" color="brandPrimary" />
          <TextInput
            style={styles.searchbar}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        {searchResults.map(({ id, name }) => (
          <View
            style={{
              ...styles.userTile,
              ...(selectedNewOwnerId === id && styles.selected),
            }}
          >
            <Text style={styles.avatar}>{getInitials(name)}</Text>
            <Text
              key={id}
              onPress={() => onNewOwnerSelect(id)}
              style={styles.name}
            >
              {name}
            </Text>
          </View>
        ))}

        {selectedNewOwnerId && (
          <View style={styles.actionContainer}>
            <Button
              text="Cancel"
              onPress={onCancel}
              accessibilityLabel="Cancel"
            />
            <Button
              text="Confirm"
              onPress={onConfirm}
              accessibilityLabel="Confirm"
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default ChangeEventOwnerDrawer;
