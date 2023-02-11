import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Container, Text, Icon, LineItem } from 'ScoutDesign/library';
import { backArrow, searchThin } from 'ScoutDesign/icons';

const MapSearch = ({
  locationToken,
  searchText,
  setSearchText,
  back,
  placeholder,
  _getPlaceDetails,
}) => {
  const [suggestedPlaces, setSuggestedPlaces] = useState();

  const getSuggestedPlaces = async () => {
    const places = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText.replace(
        / /g,
        '+'
      )}&key=${
        Constants?.manifest?.extra?.GOOGLE_MAPS_API_KEY
      }&sessiontoken=${locationToken}`
    ).catch((err) => console.error(err));
    const placesData = await places.json();
    setSuggestedPlaces(placesData.predictions);
  };

  const searchUpdateHandler = (value) => {
    setSearchText(value);
    if (searchText.length > 1) {
      getSuggestedPlaces();
    }
  };

  return (
    <Container
      padding="none"
      radius="m"
      backgroundColor="white"
      width="100%"
      alignItems="center"
    >
      <Container padding="none" flexDirection="row">
        <Icon
          icon={backArrow}
          size="m"
          padding="m"
          color="darkGrey"
          onPress={back}
        />
        <TextInput
          value={searchText}
          style={styles.searchBar}
          onChangeText={searchUpdateHandler}
          placeholder={placeholder}
          placeholderTextColor="#90A7A5"
        />
      </Container>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          flex: 1,
          width: '100%',
          maxHeight: Dimensions.get('window').width,
        }}
      >
        {suggestedPlaces &&
          suggestedPlaces.map((place) => {
            return (
              <LineItem
                key={place?.['place_id']}
                accessibilityLabel="search suggestion"
                type="button"
                onPress={() => {
                  setSearchText('');
                  setSuggestedPlaces(null);
                  _getPlaceDetails(
                    suggestedPlaces.find(({ id }) => id === place.id).place_id
                  );
                }}
                leftComponent={
                  <Icon icon={searchThin} size="s" color="morningGrey" />
                }
              >
                <Text color="darkGrey">{place.description}</Text>
              </LineItem>
            );
          })}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    height: 60,
    fontSize: 18,
  },
});

export default MapSearch;
