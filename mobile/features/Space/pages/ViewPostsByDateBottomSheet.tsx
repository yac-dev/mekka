import React, { useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';

import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ViewPostContext } from '../contexts/ViewPostContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import backendAPI from '../../../apis/backend';
import FastImage from 'react-native-fast-image';

// rgb(35, 35, 35)
const ViewPostsByDateBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['75%'], []);
  const { isIpad, setLoading, authData } = useContext(GlobalContext);
  // const { datePostsBottomSheetRef } = useContext(ViewPostContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const iconContainerWidth = oneGridWidth * 0.9;

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.viewPostsByDateBottomSheetRef}
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
        <View style={{ borderBottomWidth: 0.3, borderColor: 'white', marginBottom: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, textAlign: 'center', marginBottom: 10 }}>
            React
          </Text>
          <TouchableOpacity
            style={{ position: 'absolute', left: 0, top: -5, marginLeft: 10 }}
            onPress={() => props.viewPostsByDateBottomSheetRef.current.close()}
          >
            <Ionicons name='close-circle-sharp' size={25} color='white' />
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};
export default ViewPostsByDateBottomSheet;
