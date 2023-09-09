import React, { useMemo, useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Header from '../components/Header';
import Menus from '../components/Menus';
import Description from '../components/Description';
import ActionButtons from '../components/ActionButtons';
import MediaStats from '../components/MediaStats';

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

  console.log(currentSpace);
  if (currentSpaceAndUserRelationship && currentSpace) {
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
        backgroundStyle={{ backgroundColor: 'rgb(40, 40, 40)' }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        // onClose={() => onSelectedItemBottomSheetClose()}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <Header />
          {/* <ActionButtons navigation={props.navigation} /> */}
          <MediaStats />
          <Description />
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

export default SpaceMenuBottomSheet;
