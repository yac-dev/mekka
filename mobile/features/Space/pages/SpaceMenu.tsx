import React, { useMemo, useContext } from 'react';
import { SpaceContext } from '../contexts/SpaceContext';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Header from '../components/SpaceMenu/Header';
import Menus from '../components/SpaceMenu/Menus';
import About from '../components/SpaceMenu/About';

// rgb(35, 35, 35)
const SpaceMenu = () => {
  const snapPoints = useMemo(() => ['70%'], []);
  const { menuBottomSheetRef, navigation } = useContext(SpaceRootContext);

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
      backgroundStyle={{ backgroundColor: 'rgb(40, 40, 40)' }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <Header />
        {/* <Menus /> */}
        <About />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default SpaceMenu;
