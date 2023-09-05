import React, { useMemo, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  InputAccessoryView,
  Keyboard,
} from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ViewPostContext } from '../contexts/ViewPostContext';
import backendAPI from '../../../apis/backend';
import { Ionicons } from '@expo/vector-icons';

// rgb(35, 35, 35)
const CommentInputBottomSheet = () => {
  const snapPoints = useMemo(() => ['80%'], []);
  const { isIpad, setLoading, authData } = useContext(GlobalContext);
  const { commentInputBottomSheetRef, textInputRef, post, navigation } = useContext(ViewPostContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const iconContainerWidth = oneGridWidth * 0.9;
  const [commentInput, setCommentInput] = useState('');
  const inputAccessoryViewID = 'COMMENT_INPUT';

  const sendComment = async () => {
    const payload = {
      content: commentInput,
      postId: post._id,
      userId: authData._id,
    };
    setLoading(true);
    const result = await backendAPI.post(`/comments/`, payload);
    setLoading(false);
    Keyboard.dismiss();
    setCommentInput('');
    commentInputBottomSheetRef.current.close();
  };
  // まあ、bottomsheetが閉じないが、まあいいか。

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={commentInputBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: 'rgb(40, 40, 40)' }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
      keyboardBehavior={'extend'}
    >
      <BottomSheetView style={{ flex: 1, paddingTop: 10 }}>
        <View style={{ borderBottomWidth: 0.3, borderColor: 'rgb(150,150,150)', marginBottom: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginBottom: 10 }}>
            Write comment
          </Text>
          <TouchableOpacity
            style={{ position: 'absolute', left: 0, top: -5, marginLeft: 10 }}
            onPress={() => {
              Keyboard.dismiss();
              setCommentInput('');
              commentInputBottomSheetRef.current.close();
            }}
          >
            <Ionicons name='close-circle-sharp' size={25} color='white' />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            marginBottom: 10,
            alignSelf: 'flex-end',
            marginRight: 20,
            borderBottomWidth: 0.3,
            borderBottomColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation?.navigate('Comments', { post });
            Keyboard.dismiss();
            commentInputBottomSheetRef.current.close();
          }}
        >
          <Text style={{ color: 'white' }}>View all comments</Text>
        </TouchableOpacity>
        <View style={{ height: '100%', flexDirection: 'row' }}>
          <BottomSheetTextInput
            multiline={true}
            placeholder={'What are your thoughts?'}
            placeholderTextColor={'rgb(170,170,170)'}
            inputAccessoryViewID={inputAccessoryViewID}
            style={{
              padding: 15,
              height: '100%',
              // padding: 10,
              // backgroundColor: 'rgb(235, 235, 235)',
              width: '100%', // ここも、下の修正に沿って80 90%に変える。
              color: 'white',
            }}
            ref={textInputRef}
            value={commentInput}
            onChangeText={setCommentInput}
            autoCapitalize='none'
          />
          <InputAccessoryView
            nativeID={inputAccessoryViewID}
            backgroundColor={'rgb(88,88,88)'}
            // style={{ paddingTop: 10, paddingBottom: 10 }}
          >
            <View>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <View></View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => {
                      Keyboard.dismiss();
                      setCommentInput('');
                      commentInputBottomSheetRef.current.close();
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => sendComment()}
                    disabled={commentInput ? false : true}
                  >
                    <Text style={{ color: commentInput ? 'white' : 'rgb(130,130,130)', fontWeight: 'bold' }}>Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </InputAccessoryView>
        </View>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default CommentInputBottomSheet;
