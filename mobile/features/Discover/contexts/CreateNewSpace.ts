import { createContext } from 'react';

// stateとactionのtypeをまず設定すると。
type CreateNewSpaceStateType = {
  name: string;
};
type CreateNewSpaceActionType = { type: 'SET_SPACE_NAME'; payload: string };

//　上で設定したstate type, dsipatchのtypeをここで使う。
export const CreateNewSpaceReducer = (
  state: CreateNewSpaceStateType,
  action: CreateNewSpaceActionType
): CreateNewSpaceStateType => {
  const { payload } = action;
  switch (action.type) {
    case 'SET_SPACE_NAME':
      return { ...state, name: payload };
    default:
      return state;
  }
};

// contextの設定。
// ここら辺のfileわけがすげー煩わしいんだよな。。。どうしようか。
interface CreateNewSpaceProps {
  createNewSpaceState: CreateNewSpaceStateType; // ここのstateの形というかtypeか。これを直さなきゃなんだね。。。
  createNewSpaceDispatch: React.Dispatch<any>;
}

export const CreateNewSpaceContext = createContext<CreateNewSpaceProps>({
  createNewSpaceState: {
    name: '',
  },
  createNewSpaceDispatch: () => {}, //　これ、あくまで{}が返るってことね。
});
