import { createContext, RefObject } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type FormType = {
  photos: string[];
  caption: string;
};

type FormContextType = {
  formData: FormType;
  setFormData: React.Dispatch<React.SetStateAction<FormType>>;
  // navigation: NavigationProp<ParamListBase> | undefined;
  // menuBottomSheetRef: RefObject<null> | null;
};

export const PostContext = createContext<FormContextType>({
  formData: {
    photos: [],
    caption: '',
  },
  setFormData: () => {},
  // navigation: undefined,
  // menuBottomSheetRef: null,
});
