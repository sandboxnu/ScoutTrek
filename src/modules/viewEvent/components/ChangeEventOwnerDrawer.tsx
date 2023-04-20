import { gql, useQuery } from '@apollo/client';
import { Button } from 'ScoutDesign/library';
import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
  ViewBase,
} from 'react-native';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
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
  title: {},
  eventOwnerName: {},
  searchbar: {},
  userTile: {},
  selected: {},
  actionContainer: {},
});

interface Props {
  visible: boolean;
  eventOwnerName: string;

  onClose: () => void;
}

const ChangeEventOwnerDrawer: React.FC<Props> = ({
  visible,
  eventOwnerName,
  onClose,
}) => {
  const [text, setText] = useState<string>('');
  const [selectedNewOwnerId, setSelectedNewOwnerId] = useState<string>('');

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
  } = useQuery(GET_USERS);

  const onChangeText = (text: string) => {
    setText(text);
    // TODO: search for all users matching search string (refetch)
  };

  const searchResults: Array<{ id: string; name: string }> = useMemo(
    () =>
      searchData.filter(
        ({ name }: { name: string }) => name.indexOf(text) > -1
      ),
    [searchData, text]
  );

  const onNewOwnerSelect = (id: string) => {
    setSelectedNewOwnerId(id);
  };

  const onCancel = () => {};

  const onConfirm = () => {};

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Event Owner</Text>
        <Text style={styles.eventOwnerName}>{eventOwnerName}</Text>
        <TextInput
          style={styles.searchbar}
          onChangeText={onChangeText}
          value={text}
        />
        {searchResults.map(({ id, name }) => (
          <Text
            key={id}
            onPress={() => onNewOwnerSelect(id)}
            style={{
              ...styles.userTile,
              ...(selectedNewOwnerId === id && styles.selected),
            }}
          >
            {name}
          </Text>
        ))}

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
      </View>
    </Modal>
  );
};

export default ChangeEventOwnerDrawer;
