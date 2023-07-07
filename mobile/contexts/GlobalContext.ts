import React, { createContext } from 'react';
import { GlobalState, GLOBAL_INITIAL_STATE } from '../types/global';

interface GlobalContextProps {
  state: GlobalState;
  dispatch: React.Dispatch<any>;
}

const GlobalContext = createContext<GlobalContextProps>({
  state: GLOBAL_INITIAL_STATE,
  dispatch: () => {},
});

export default GlobalContext;
