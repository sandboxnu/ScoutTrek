import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import EventHeader from '../components/EventHeader';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import InlineButton from '../../../components/buttons/InlineButton';
import {getAddress} from '../campoutViews/CampoutView';

import {GOOGLE_MAPS_API_KEY} from '../../../../env';

import {gql, useMutation, useQuery} from '@apollo/client';
import NoShadowPurpleBtn from '../../../components/buttons/NoShadowPurpleBtn';
import {DELETE_EVENT} from '../campoutViews/CampoutView';
import Location from '../../../components/EventInfoComponents/Location';
import Time from '../../../components/EventInfoComponents/Time';
import Constants from 'expo-constants';
import Description from '../../../components/EventInfoComponents/Description';

export const GET_HIKE = gql`
  query GetHike($id: ID!) {
    event: hike(id: $id) {
      id
      type
      title
      description
      datetime
      date
      time
      distance
      meetTime
      leaveTime
      location {
        lat
        lng
      }
      meetLocation {
        lat
        lng
      }
      creator {
        id
        name
      }
    }
  }
`;

const EventDetailsScreen = ({route, navigation}) => {
  const {currItem} = route.params;
  const {loading, error, data} = useQuery(GET_HIKE, {
    fetchPolicy: 'network-only',
    variables: {id: currItem},
  });

  const [deleteEvent] = useMutation(DELETE_EVENT);

  const [address, setAddress] = useState('');
  const [meetAddress, setMeetAddress] = useState('');

  useEffect(() => {
    const getAddresses = async () => {
      const address = await getAddress(
        +data.event.location.lat,
        +data.event.location.lng
      );
      const meetAddress = await getAddress(
        +data.event.meetLocation.lat,
        +data.event.meetLocation.lng
      );
      Promise.all([address, meetAddress]).then((values) => {
        setAddress(address);
        setMeetAddress(meetAddress);
      });
    };
    if (data && !address) {
      getAddresses();
    }
  }, [data]);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  // Clear database and
  let mapUrl;
  if (data.event.location) {
    mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${data.event.location.lat},${data.event.location.lng}&zoom=13&size=325x375&maptype=roadmap&markers=color:blue%7C${data.event.location.lat},${data.event.location.lng}&key=${GOOGLE_MAPS_API_KEY}`;
  }
  return (
    <ScrollView
      style={{
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
      }}
      contentContainerStyles={{
        flexGrow: 1,
      }}>
      <EventHeader
        navigation={navigation}
        image_path={data.event.location ? mapUrl : null}
        title={data.event.title}
        name={data.event.creator.name}
        date={+data.event.datetime}
      />

      <Location heading="Meet Place" address={meetAddress} />
      <Time time={+data.event.meetTime} text="arrive at meet place" />
      <Time time={+data.event.leaveTime} text="leave meet place" />
      <Location heading="Event location" address={address} />
      <Time time={+data.event.datetime} text="event start time" />

      <Description description={data.event.description} />

      <View
        style={{
          marginHorizontal: 15,
          paddingBottom: 8,
          marginBottom: 8,
        }}>
        <NoShadowPurpleBtn
          onPress={() =>
            navigation.navigate('EventThread', {
              id: data.event.id,
              name: data.event.title,
              messages: data.event.messages,
            })
          }
        />
      </View>
      <View style={{marginHorizontal: 15, marginBottom: 12}}>
        <InlineButton
          title="Edit"
          onPress={() => navigation.navigate('EditHike', {currItem})}
        />
        <InlineButton
          title="Cancel"
          color={Colors.red}
          onPress={() =>
            Alert.alert(
              'Are you sure you want to cancel this event?',
              'This action cannot be undone.',
              [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Confirm',
                  onPress: async () => {
                    await deleteEvent({
                      variables: {
                        id: data.event.id,
                      },
                    });
                    navigation.goBack();
                  },
                },
              ],
              {cancelable: true}
            )
          }
        />
      </View>
    </ScrollView>
  );
};

export default EventDetailsScreen;
