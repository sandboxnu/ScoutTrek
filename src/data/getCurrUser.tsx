import { gql } from '@apollo/client';

export const USER_FIELDS = gql`
  fragment UserFragment on User {
    id
    name
    email
    currRole
    currPatrol {
      id
      name
    }
    currTroop {
      id
      unitNumber
      council
      patrols {
        id
        name
        members {
          id
          name
        }
      }
    }
    userPhoto
    unreadNotifications {
      id
      createdAt
      title
      type
      eventType
      eventID
    }
    otherGroups {
      id
      troopNumber
    }
  }
`;

export const GET_INITIAL_USER_FIELDS = gql`
  query GetInitialUserFields {
    currUser {
      noGroups
    }
  }
`;

export const GET_CURR_USER = gql`
  query GetCurrUser {
    currUser {
      ...UserFragment
    }
  }
  ${USER_FIELDS}
`;
