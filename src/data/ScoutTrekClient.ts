import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import {ApolloClient, InMemoryCache, from, ApolloLink, HttpLink} from '@apollo/client';
import {onError} from '@apollo/client/link/error';

import {LOCAL_IP_ADDRESS, ENV} from '@env';

type AsyncStorageData = {[key: string]: string | null};

const httpLink = new HttpLink({
  uri: ENV == 'dev' ? 
    `http://${LOCAL_IP_ADDRESS}:4000/graphql` : 
    'https://beta-dot-scouttrek-node-api.appspot.com/graphql',
});

const loadKeysFromAsyncStorage = async (
  asyncDataKeys: string[]
): Promise<AsyncStorageData> => {
  let asyncData: AsyncStorageData = {};
  for (const key of asyncDataKeys) {
    const value = await AsyncStorage.getItem(key);
    asyncData[key] = value;
  }
  return asyncData;
};

const authMiddleware = new ApolloLink((operation, forward) => {
  return loadKeysFromAsyncStorage(['userToken', 'currMembershipID']).then(
    ({userToken, currMembershipID}) => {
      operation.setContext({
        headers: {
          membership: currMembershipID ? currMembershipID : undefined,
          authorization: userToken,
        },
      });
      return forward(operation);
    }
  );
});

const errorMiddleware = onError(
  ({graphQLErrors, networkError, operation, forward}) => {
    if (graphQLErrors) {
      graphQLErrors.map(({message, locations, path}) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
      return forward(operation);
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
  }
);

const ScoutTrekApolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          events: {
            merge(_ignored, incoming) {
              return incoming;
            },
          },
          currUser: {
            merge(previous, incoming) {
              return {...previous, ...incoming};
            },
          },
        },
      },
      Event: {
        fields: {
          mapImageSource(_, {readField}) {
            const location = readField<string>('location');
            const mapUrl = location
              ? `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=12&size=350x400&maptype=roadmap&markers=size:mid%7Ccolor:orange%7C${location.lat},${location.lng}&key=${Constants?.manifest?.extra?.GOOGLE_MAPS_API_KEY}`
              : null;
            return mapUrl;
          },
        },
      },
    },
  }),
  link: from([authMiddleware, errorMiddleware, httpLink]),
});

export default ScoutTrekApolloClient;
