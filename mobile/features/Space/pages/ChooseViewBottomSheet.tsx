import React, { useMemo, useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// rgb(35, 35, 35)
const ChooseViewBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['60%'], []);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.chooseViewBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: 'rgb(40, 40, 40)' }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ flex: 1, paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}>
        <TouchableOpacity style={{ padding: 20 }}>
          <Text style={{ color: 'white' }}>Grid</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 20 }} onPress={() => props.navigation.navigate('Map')}>
          <Text style={{ color: 'white' }}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 20 }}>
          <Text style={{ color: 'white' }}>Calendar</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
            style={{
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              marginBottom: 10,
            }}
            onPress={() => spaceMenuBottomSheetRef.current.close()}
          >
            <Ionicons name='close' size={20} color='black' />
            <Text>Close</Text>
          </TouchableOpacity> */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default ChooseViewBottomSheet;
