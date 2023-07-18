import React, { useMemo, useContext } from 'react';
import { SpaceContext } from '../contexts/SpaceContext';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const SpaceMenu = () => {
  const snapPoints = useMemo(() => ['70%'], []);
  const { menuBottomSheetRef } = useContext(SpaceContext);

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
      backgroundStyle={{ backgroundColor: 'white' }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <View>
          <Text style={{ color: 'red' }}>Hello</Text>
        </View>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default SpaceMenu;
