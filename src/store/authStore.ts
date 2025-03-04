import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScoutTrekApolloClient } from 'data';
import { IsNewUserQuery, IS_NEW_USER_QUERY } from 'data/getCurrUser';
import {
  SignupInput,
  SignUpMutation,
  SIGN_UP,
} from '../gqlClient/mutations/signUp';
import { AsyncStorageKeys } from '../constants/asyncStorageKeys';
import { executeQuery } from '../gqlClient/executeQuery';
import { StoreGet, StoreSet } from './useStore';
import {
  LoginInput,
  LoginMutation,
  LOG_IN,
} from '../gqlClient/mutations/login';
import { executeMutation } from '../gqlClient/executeMutation';

export interface AuthStore {
  token: string | null;
  isNewUser: boolean;

  clearToken: () => Promise<void>;
  setIsNewUser: (isNewUser: boolean) => Promise<void>;
  initUser: () => Promise<void>;
  signUp: (input: SignupInput) => Promise<void>;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
}

const authStore = (set: StoreSet, get: StoreGet): AuthStore => ({
  token: null,
  isNewUser: true,

  clearToken: async () => {
    await AsyncStorage.removeItem(AsyncStorageKeys.userToken);
    set({ token: null });
  },

  setIsNewUser: async (isNewUser: boolean) => {
    set({ isNewUser: isNewUser });
  },

  initUser: async () => {
    const token = await AsyncStorage.getItem(AsyncStorageKeys.userToken);
    const ret = await executeQuery<IsNewUserQuery>(IS_NEW_USER_QUERY);

    set({ token });

    if (ret && ret.currUser) {
      set({ isNewUser: ret.currUser.noGroups });
    }
  },

  signUp: async (input: SignupInput) => {
    const ret = await executeMutation<SignUpMutation, SignupInput>(
      SIGN_UP,
      input
    );

    if (ret) {
      await AsyncStorage.setItem(AsyncStorageKeys.userToken, ret.token);
      set({ token: ret.token, isNewUser: ret.noGroups });
    }
  },

  login: async (input: LoginInput) => {
    const ret = await executeMutation<LoginMutation, LoginInput>(LOG_IN, input);

    if (ret) {
      const { token, groupID } = ret.login;
      await AsyncStorage.setItem(AsyncStorageKeys.userToken, token);
      await AsyncStorage.setItem(
        AsyncStorageKeys.currMembershipID,
        groupID || ''
      );
      set({ token });
    }
  },

  logout: async () => {
    const { clearToken } = get();
    await clearToken();
    await AsyncStorage.removeItem(AsyncStorageKeys.currMembershipID);
    ScoutTrekApolloClient.stop();
    await ScoutTrekApolloClient.clearStore();
  },
});

export default authStore;
