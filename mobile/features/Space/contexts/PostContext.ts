import { createContext, RefObject } from 'react';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';

type LocationType = {
  type: string;
  coordinates: number[];
};

type FormType = {
  photos: string[];
  caption: string;
  location: LocationType;
};

type FormContextType = {
  formData: FormType;
  setFormData: React.Dispatch<React.SetStateAction<FormType>>;
  navigation: NavigationProp<ParamListBase> | undefined;
  route: RouteProp<any, any> | undefined;
};

export const PostContext = createContext<FormContextType>({
  formData: {
    photos: [],
    caption: '',
    location: {
      type: 'Point',
      coordinates: [],
    },
  },
  setFormData: () => {},
  navigation: undefined,
  route: undefined,
});
