import React, { useMemo, useContext } from 'react';
import { SpaceContext } from '../contexts/SpaceContext';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import SpaceIcon from '../components/SpaceIcon';
import SpaceMenus from '../components/SpaceMenus';

const SpaceMenu = () => {
  const snapPoints = useMemo(() => ['70%'], []);
  const { menuBottomSheetRef, navigation } = useContext(SpaceContext);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={menuBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: 'rgb(63, 63, 63)' }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <SpaceIcon />
        <SpaceMenus />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default SpaceMenu;
