import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import Constants from 'expo-constants';
import { GET_EVENTS } from 'data';

import { useQuery } from '@apollo/client';
import NoEvents from '../../components/NoEvents';
import { Badge, Card, Container, Text } from 'ScoutDesign/library';
import moment from 'moment';
import useCurrMonthEvents from './hooks/useCurrMonthEvents';
import { convertEventIDToText } from 'data';
import { MainBottomParamList } from '../navigation/MainTabNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/MainStackNavigator';
import { Color } from 'ScoutDesign/library/Atoms/utility';

const getColor = (): Color => {
  const allColors: Color[] = [
    'interactive',
    'urgent',
    'information',
    'brandSecondary',
    'brandSecondaryDark',
    'brandPrimary',
    'brandPrimaryDark',
  ];
  return allColors[Math.floor(Math.random() * allColors.length)];
};

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainBottomParamList, 'Calendar'>, // param list of parent stack
  StackScreenProps<MainStackParamList> // param list of grandparent stack
>;

const CalendarView = ({ navigation }: ProfileScreenProps) => {
  const { data, loading, error } = useQuery(GET_EVENTS, {
    fetchPolicy: 'network-only',
  });

  const { currMonthEvents, loadItemsForMonth } = useCurrMonthEvents();

  const itemColor = useRef(getColor());

  const renderEmptyDate = () => {
    return (
      <Container flex={1} justifyContent="flex-end">
        <Text size="s" color="interactiveLight">
          No events on this day.
        </Text>
      </Container>
    );
  };

  const viewEvent = (item: any) => {
    navigation.navigate('ViewEvent', { currItem: item.id });
  };

  const renderItem = (item: any) => {
    const labels = item?.labels?.map((label: string, index: number) => {
      if (index === 0) {
        return (
          <Badge
            accessibilityLabel={`label-${label}`}
            key={`label-${label}`}
            text={label}
            marginHorizontal="s"
            color="brandSecondaryDark"
          />
        );
      } else {
        return (
          <Badge
            accessibilityLabel={`label-${label}`}
            key={`label-${label}`}
            text={convertEventIDToText(label)}
            color={itemColor.current}
          />
        );
      }
    });

    return (
      <Container flex={1} padding="s" marginRight="m">
        <Card accessibilityLabel="eventView" onPress={() => viewEvent(item)}>
          <Text numberOfLines={1} size="l" weight="bold">
            {item.title}
          </Text>
          <Container padding="none" flexDirection="row" alignItems="center">
            <Text>
              {new Date(item.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })}
            </Text>
            {labels}
          </Container>
        </Card>
      </Container>
    );
  };

  if (error)
    return (
      <Text>
        <>Error: {error}</>
      </Text>
    );
  if (loading) return <Text>Loading...</Text>;
  if (!data.events.length) {
    return <NoEvents navigation={navigation} />;
  }

  return (
    <Agenda
      selected={moment().format('YYYY-MM-DD')}
      current={moment().format('YYYY-MM-DD')}
      style={styles.container}
      loadItemsForMonth={(calData) => loadItemsForMonth(data.events, calData)}
      items={currMonthEvents}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
});

export default CalendarView;
