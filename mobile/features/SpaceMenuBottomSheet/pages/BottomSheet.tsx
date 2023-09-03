import React, { useMemo, useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Header from '../components/Header';
import Menus from '../components/Menus';
import Description from '../components/Description';

// rgb(35, 35, 35)
const SpaceMenuBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['70%'], []);
  const {
    spaceMenuBottomSheetRef,
    currentSpaceAndUserRelationship,
    setCurrentSpaceAndUserRelationship,
    currentSpace,
    setCurrentSpace,
  } = useContext(GlobalContext);
  // const { navigation } = useContext(HomeStackNavContext);

  if (currentSpaceAndUserRelationship) {
    return (
      <GorhomBottomSheet
        index={-1}
        enableOverDrag={true}
        ref={spaceMenuBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: 'rgb(50, 50, 50)' }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        // onClose={() => onSelectedItemBottomSheetClose()}
      >
        <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
          <Header />
          <Menus navigation={props.navigation} />
          <Description />
          {/* <About /> */}
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

export default SpaceMenuBottomSheet;