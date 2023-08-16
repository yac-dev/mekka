import React, { useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';

import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ViewPostContext } from '../contexts/ViewPostContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

// rgb(35, 35, 35)
const CommentInputBottomSheet = () => {
  const snapPoints = useMemo(() => ['70%'], []);
  const { isIpad } = useContext(GlobalContext);
  const { commentInputBottomSheetRef, reactionStatuses, setReactionStatuses, areReactionStatusesFetched } =
    useContext(ViewPostContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const iconContainerWidth = oneGridWidth * 0.9;

  // とりあえず、1以上のものだけ、0のものをextractする感じでいいか。

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
    >
      <BottomSheetView style={{ flex: 1, paddingTop: 10 }}>
        <TouchableOpacity style={{ marginBottom: 10, alignSelf: 'flex-end', marginRight: 20 }}>
          <Text style={{ color: 'white' }}>View all comments</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default CommentInputBottomSheet;
