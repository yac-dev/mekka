import React, { useReducer, useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { primaryBackgroundColor, inputBackgroundColor, modalBackgroundColor } from '../../../themes/color';
import { primaryTextColor, placeholderTextColor } from '../../../themes/text';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import backendAPI from '../../../apis/backend';
import Form from '../components/Form';

type FormDataStateType = {
  name: string;
  icon: string;
  contentType: string;
  isPublic: boolean;
  isCommentAvailable: boolean;
  isReactionAvailable: boolean;
  // reactions: string[];
  // tags: string[];
};

const CreateNewSpace = () => {
  // ここに、stateを持たせるのって、よくないのかね。。。分からん。。。
  const { globalState } = useContext(GlobalContext);
  const [formData, setFormData] = useState<FormDataStateType>({
    name: '',
    icon: '',
    contentType: 'photo', // ここら辺は、全部選択式になる。
    isPublic: true,
    isCommentAvailable: true,
    isReactionAvailable: true,
    // reactions: [],
    // tags: []
  });
  // const [state, dispatch] = useReducer(CreateNewSpaceReducer, {
  //   name: '',
  //   contentType: 'photo', // ここら辺は、全部選択式になる。
  //   isPublic: true,
  //   isCommentAvailable: true,
  //   isReactionAvailable: true,
  //   // reactions: [],
  //   // tags: [], // ここからが、やっていて多分面白くなるところだと思う。
  // });

  const onDonePress = async () => {
    // const payload = {
    //   name: state.name,
    //   contentType: state.contentType,
    //   isPublic: state.isPublic,
    //   isCommentAvailable: state.isCommentAvailable,
    //   isReactionAvailable: state.isReactionAvailable,
    //   createdBy: globalState.authData._id, // possibly nullなだけね。まあ後で
    // };
    // const result = await backendAPI.post('/spaces', payload);
  };

  return (
    <CreateNewSpaceContext.Provider value={{ formData, setFormData }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: modalBackgroundColor }}>
        <View style={{ flex: 1, backgroundColor: modalBackgroundColor, padding: 10 }}>
          <Form />
          {/* <Text style={{ color: primaryTextColor }}>Create your photos/videos sharing space from scratch</Text>
          <TextInput
            placeholder='Space name'
            placeholderTextColor={placeholderTextColor}
            onChangeText={(text) => {
              dispatch({ type: 'SET_NAME', payload: text });
            }}
            value={state.name}
            style={{
              color: primaryTextColor,
              backgroundColor: inputBackgroundColor,
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
          />
          <Text style={{ color: primaryTextColor }}>Content type</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_CONTENT_TYPE', payload: 'photo' })}
            >
              <Text style={{ color: primaryTextColor }}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_CONTENT_TYPE', payload: 'video' })}
            >
              <Text style={{ color: primaryTextColor }}>Video</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ color: primaryTextColor }}>visibility</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_IS_PUBLIC', payload: true })}
            >
              <Text style={{ color: primaryTextColor }}>yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_IS_PUBLIC', payload: false })}
            >
              <Text style={{ color: primaryTextColor }}>no</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ color: primaryTextColor }}>is comment available</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_IS_COMMENT_AVAILABLE', payload: true })}
            >
              <Text style={{ color: primaryTextColor }}>yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_IS_COMMENT_AVAILABLE', payload: false })}
            >
              <Text style={{ color: primaryTextColor }}>no</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ color: primaryTextColor }}>isReaction available</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_IS_REACTION_AVAILABLE', payload: true })}
            >
              <Text style={{ color: primaryTextColor }}>yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_IS_REACTION_AVAILABLE', payload: false })}
            >
              <Text style={{ color: primaryTextColor }}>no</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ backgroundColor: 'yellow', padding: 10 }} onPress={() => onDonePress()}>
            <Text style={{ color: 'red' }}>Create</Text>
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>
    </CreateNewSpaceContext.Provider>
  );
};

export default CreateNewSpace;
