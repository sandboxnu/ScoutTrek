import { useEffect, useState } from 'react';
import { Dimensions, Keyboard, StyleSheet, View } from 'react-native';
import { Text } from 'ScoutDesign/library';
import DefaultInputButton from './components/DefaultInputButton';
import {
  useEventForm,
  addEventFieldOfType,
} from 'CreateEvent/CreateEventFormStore';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import MapSearch from '../../../components/MapSearch';
import Constants from 'expo-constants';

import uuidv4 from 'uuid/v1';

const locationToken = uuidv4();

const ChooseLocation = ({ id, Modal, modalProps, questionText }) => {
  const [{ fields }, dispatch] = useEventForm();
  const initialLocation = fields?.[id];
  const [location, setLocation] = useState(
    initialLocation
      ? { latitude: initialLocation.lat, longitude: initialLocation.lng }
      : null
  );
  const [errorMsg, setErrorMsg] = useState('');
  const [locationCoords, setLocationCoords] = useState(
    initialLocation
      ? { latitude: initialLocation.lat, longitude: initialLocation.lng }
      : null
  );
  const [locationString, setLocationString] = useState(
    initialLocation?.address || ''
  );

  const [searchText, setSearchText] = useState(initialLocation?.address || '');

  const _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const userLocation = await Location.getCurrentPositionAsync({
      accuracy: 7,
    });

    setLocation({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
    });
  };

  const _getPlaceDetails = async (id) => {
    const locationDetails = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${Constants?.manifest?.extra?.GOOGLE_MAPS_API_KEY}`
    ).catch((err) => console.error(err));
    const locationData = await locationDetails.json();

    const chosenPlace = {
      latitude: locationData.result.geometry.location.lat,
      longitude: locationData.result.geometry.location.lng,
    };
    setLocation(chosenPlace);
    setLocationCoords(chosenPlace);
    setLocationString(locationData.result.formatted_address);

    Keyboard.dismiss();
  };

  const next = () => {
    dispatch(
      addEventFieldOfType(id, {
        address: locationString,
        lat: location.latitude,
        lng: location.longitude,
      })
    );
  };

  useEffect(() => {
    _getLocationAsync();
  }, []);

  if (!location) {
    return <View />;
  }

  return (
    <Modal
      onNext={next}
      {...modalProps}
      noStyles
      title={questionText}
      valid={location && !searchText}
    >
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={
          locationCoords && {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0822,
            longitudeDelta: 0.04,
          }
        }
      >
        {locationCoords && <Marker coordinate={locationCoords} />}
      </MapView>
      <View style={styles.searchContainer}>
        <MapSearch
          locationToken={locationToken}
          back={modalProps.escape}
          placeholder={locationString || questionText}
          searchText={searchText}
          setSearchText={setSearchText}
          _getPlaceDetails={_getPlaceDetails}
          style={styles.searchBar}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchContainer: {
    position: 'absolute',
    top: Constants.statusBarHeight,
    right: 10,
    left: 10,
  },
});

// @todo - create more scalable type for data display completed components
const LocationLineItem = ({ data }: { data: any }) => {
  return (
    <Text
      size="m"
      weight="bold"
      color="brandPrimaryDark"
      paddingHorizontal="m"
      marginRight="s"
    >
      {data.address}
    </Text>
  );
};

export default {
  InitialButton: DefaultInputButton,
  EditingComponent: ChooseLocation,
  CompletedComponent: LocationLineItem,
};
