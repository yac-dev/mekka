import React, { createContext } from 'react';
import { GlobalState, GLOBAL_INITIAL_STATE } from '../types/global';

interface GlobalContextProps {
  globalState: GlobalState;
  globalDispatch: React.Dispatch<any>;
}

const GlobalContext = createContext<GlobalContextProps>({
  globalState: GLOBAL_INITIAL_STATE,
  globalDispatch: () => {},
});

export default GlobalContext;
