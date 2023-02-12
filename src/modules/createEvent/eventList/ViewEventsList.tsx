import { StyleSheet, View, ActivityIndicator } from 'react-native';
import {
  useEventForm,
  initializeEventForm,
} from 'CreateEvent/CreateEventFormStore';

import Constants from 'expo-constants';

import { gql, useQuery } from '@apollo/client';
import { backArrow } from 'ScoutDesign/icons';
import { ImageTileGrid, LargeFloatingButton } from 'ScoutDesign/library';

import { convertEventIDToText } from 'data/utils/convertIDsToStrings';
import { TileProps } from 'ScoutDesign/library/Widgets/ImageTileGrid/ImageTileGrid';

export const GET_EVENT_SCHEMAS = gql`
  query EventSchemas {
    eventSchemas
  }
`;

type Props = {
  navigation: any;
};

const ViewEventsList = ({ navigation }: Props) => {
  const eventForm = useEventForm();
  const dispatch = eventForm && eventForm[1];
  const { loading, data } = useQuery(GET_EVENT_SCHEMAS);

  if (loading) {
    return <ActivityIndicator />;
  }

  const eventSchemasArr = Object.values(data['eventSchemas']);
  const tiles = eventSchemasArr.reduce((res: TileProps[], item: any) => {
    if (typeof item === 'object') {
      const title = convertEventIDToText(item?.metaData?.eventID);
      res.push({
        id: item?.metaData?.eventID,
        source: item?.metaData?.image,
        title,
        onPress: () => {
          dispatch && dispatch(initializeEventForm(item?.metaData?.eventID));
          navigation.navigate('EventForm', {
            type: item?.metaData?.eventID,
          });
        },
        accessibilityLabel: title,
      });
    }
    return res;
  }, []);

  return (
    <View style={styles.container}>
      <ImageTileGrid rows={2} padding="xs" tiles={tiles} />
      <LargeFloatingButton
        accessibilityLabel="cancel new event"
        icon={backArrow}
        text="Back"
        corner="bottom-right"
        distanceFromCorner="l"
        onPress={navigation.goBack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ViewEventsList;
