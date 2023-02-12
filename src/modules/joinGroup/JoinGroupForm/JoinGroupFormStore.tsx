import { createContext, useContext, useReducer, Dispatch } from 'react';
import { JoinGroupFormState } from './joinGroupFormReducer';

// Action types
export const CHOOSE_GROUP = 'CHOOSE_GROUP';
export const CHOOSE_ROLE = 'CHOOSE_ROLE';
export const ADD_CHILDREN = 'ADD_CHILDREN';
export const CHOOSE_PATROL = 'CHOOSE_PATROL';
export const CLEAR_FORM = 'CLEAR_FORM';

// Actions
export const chooseGroup = (group: string, groupNum: string) => ({
  type: CHOOSE_GROUP,
  group,
  groupNum: groupNum.toString(),
});

export const chooseRole = (role: string) => ({
  type: CHOOSE_ROLE,
  role,
});

export const addChildren = (children: string[]) => ({
  type: ADD_CHILDREN,
  children,
});

export const choosePatrol = (patrol: string) => ({
  type: CHOOSE_PATROL,
  patrol,
});

export const clearForm = () => ({
  type: CLEAR_FORM,
});

const JoinGroupStore = createContext<
  [formState: JoinGroupFormState, dispatch: Dispatch<any>] | undefined
>(undefined);
JoinGroupStore.displayName = 'JoinGroupStore';

export const useJoinGroupForm = () => useContext(JoinGroupStore);

type Props = {
  initialState: JoinGroupFormState;
  reducer: (state: JoinGroupFormState, action: any) => JoinGroupFormState;
  children: any;
};

export const JoinGroupFormProvider = ({
  initialState,
  reducer,
  children,
}: Props) => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  return (
    <JoinGroupStore.Provider value={[formState, dispatch]}>
      {children}
    </JoinGroupStore.Provider>
  );
};
