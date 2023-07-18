import { createContext, RefObject } from 'react';

type SpaceType = {
  name: string;
};

type SpaceContextType = {
  space: SpaceType;
  setSpace: React.Dispatch<React.SetStateAction<SpaceType>>;
  menuBottomSheetRef: RefObject<null> | null;
};

export const SpaceContext = createContext<SpaceContextType>({
  space: {
    name: '',
  },
  setSpace: () => {},
  menuBottomSheetRef: null,
});
