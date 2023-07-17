import { createContext } from 'react';

type SpaceType = {
  name: string;
};

type SpaceContextType = {
  space: SpaceType;
  setSpace: React.Dispatch<React.SetStateAction<SpaceType>>;
};

export const SpaceContext = createContext<SpaceContextType>({
  space: {
    name: '',
  },
  setSpace: () => {},
});
