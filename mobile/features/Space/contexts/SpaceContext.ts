import { createContext, RefObject } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type SpaceType = {
  name: string;
};

type LocationType = {
  type: string;
  coordinates: number[];
};

type ContentType = {
  _id: string;
  data: string;
  type: string;
  createdBy: string;
  createdAt: string;
};

type PostType = {
  _id: string;
  location: LocationType;
  contents: ContentType[];
  caption: string;
  spaceId: string;
  tags: string[];
  createdBy: string;
  createdAt: string;
};

type SpaceContextType = {
  space: SpaceType;
  setSpace: React.Dispatch<React.SetStateAction<SpaceType>>;
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  navigation: NavigationProp<ParamListBase> | undefined;
  menuBottomSheetRef: RefObject<null> | null;
};

export const SpaceContext = createContext<SpaceContextType>({
  space: {
    name: '',
  },
  setSpace: () => {},
  posts: [],
  setPosts: () => {},
  navigation: undefined,
  menuBottomSheetRef: null,
});
