import { gql } from '@apollo/client';

export const EVENT_FIELDS = gql`
  fragment EventFragment on Event {
    id
    type
    title
    description
    date
    startTime
    distance
    uniqueMeetLocation
    meetTime
    leaveTime
    pickupTime
    endTime
    endDate
    location {
      lat
      lng
      address
    }
    meetLocation {
      lat
      lng
      address
    }
    creator {
      id
      name
    }
    mapImageSource @client
  }
`;

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      ...EventFragment
    }
  }
  ${EVENT_FIELDS}
`;
