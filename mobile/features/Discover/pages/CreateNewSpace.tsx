import React, { useReducer } from 'react';
import { View, Text } from 'react-native';
import { primaryBackgroundColor } from '../../../themes/color';
import { primaryTextColor } from '../../../themes/text';
import { CreateNewSpaceReducer, CreateNewSpaceContext } from '../contexts/CreateNewSpace';

const CreateNewMekka = () => {
  // ここに、stateを持たせるのって、よくないのかね。。。分からん。。。
  const [state, dispatch] = useReducer(CreateNewSpaceReducer, { name: '' });

  return (
    <CreateNewSpaceContext.Provider value={{ createNewSpaceState: state, createNewSpaceDispatch: dispatch }}>
      <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, padding: 10 }}>
        <Text style={{ color: primaryTextColor }}>Create your photos/videos sharing space from scratch</Text>
      </View>
    </CreateNewSpaceContext.Provider>
  );
};

export default CreateNewMekka;
