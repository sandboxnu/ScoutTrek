import { gql } from '@apollo/client';

export const typeDefs = gql`
  type AppState {
    isDarkMode: Boolean
  }
`;

const getAppState = gql`
  query {
    state @client {
      appState {
        isDarkModeEnabled
      }
    }
  }
`;

export const resolvers = (getState, writeState) => {
  return {
    Mutation: {
      updateAppState(_, appState) {
        // get current / initial state from cache
        const state = getState(getAppState);

        const newState = {
          ...state,
          appState: Object.assign({}, state.appState, appState),
        };

        writeState(newState);
        return newState;
      },
    },
  };
};
