import { createContext, RefObject } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type SpaceType = {
  name: string;
};

type SpaceContextType = {
  space: SpaceType;
  setSpace: React.Dispatch<React.SetStateAction<SpaceType>>;
  navigation: NavigationProp<ParamListBase> | undefined;
  menuBottomSheetRef: RefObject<null> | null;
};

export const SpaceContext = createContext<SpaceContextType>({
  space: {
    name: '',
  },
  setSpace: () => {},
  navigation: undefined,
  menuBottomSheetRef: null,
});
