import { GOOGLE_MAPS_API_KEY } from '@env';
import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, Dimensions } from 'react-native';
import { Container, Text, Icon, LineItem } from 'ScoutDesign/library';
import { backArrow, searchThin } from 'ScoutDesign/icons';

type MapSearchProps = {
  locationToken: string;
  searchText: string;
  setSearchText: (text: string) => any;
  back: () => any;
  placeholder?: string | undefined;
  _getPlaceDetails: (id: string) => any;
};

type Place = {
  id: number;
  description: string;
  place_id: string;
};

const MapSearch = ({
  locationToken,
  searchText,
  setSearchText,
  back,
  placeholder,
  _getPlaceDetails,
}: MapSearchProps) => {
  const [suggestedPlaces, setSuggestedPlaces] = useState<Place[] | null>();

  const getSuggestedPlaces = async () => {
    const places = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText.replace(
        / /g,
        '+'
      )}&key=${GOOGLE_MAPS_API_KEY}&sessiontoken=${locationToken}`
    ).catch((err) => console.error(err));
    const placesData = await places?.json();
    setSuggestedPlaces(placesData?.predictions);
  };

  const searchUpdateHandler = (value: string) => {
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
                    suggestedPlaces.find(({ id }) => id === place.id)!.place_id
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
