import React, { useMemo, useContext } from 'react';
import { SpaceContext } from '../contexts/SpaceContext';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Header from '../components/SpaceMenu/Header';
import Menus from '../components/SpaceMenu/Menus';
import About from '../components/SpaceMenu/About';
import { AntDesign } from '@expo/vector-icons';
import { HomeStackNavContext } from '../../../contexts/HomeStackNavContext';

// rgb(35, 35, 35)
const SpaceMenuBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['70%'], []);
  // const { spaceMenuBottomSheetRef, space, navigation } = useContext(SpaceRootContext);
  const { spaceMenuBottomSheetRef, currentSpaceAndUserRelationship, setCurrentSpaceAndUserRelationship } =
    useContext(GlobalContext);
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
        backgroundStyle={{ backgroundColor: 'rgb(30, 30, 30)' }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        // onClose={() => onSelectedItemBottomSheetClose()}
      >
        <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
          <Header />
          <Menus navigation={props.navigation} />
          {/* <About /> */}
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

export default SpaceMenuBottomSheet;
