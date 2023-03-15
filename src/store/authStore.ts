import AsyncStorage from '@react-native-async-storage/async-storage';
import { IS_NEW_USER_QUERY } from 'data/getCurrUser';
import { AsyncStorageKeys } from '../constants/asyncStorageKeys';
import { executeQuery } from '../gqlClient/executeQuery';
import { StoreGet, StoreSet } from './useStore';

export interface AuthStore {
  token: string | null;
  isNewUser: boolean;

  initUser: () => Promise<void>;
}

const authStore = (set: StoreSet, get: StoreGet): AuthStore => ({
  token: null,
  isNewUser: true,

  initUser: async () => {
    const { setIsLoading } = get();
    setIsLoading(true);
    const token = await AsyncStorage.getItem(AsyncStorageKeys.userToken);
    const isNewUser = await executeQuery(IS_NEW_USER_QUERY);
    setIsLoading(false);
    set({ token, isNewUser });
  },
});

export default authStore;
