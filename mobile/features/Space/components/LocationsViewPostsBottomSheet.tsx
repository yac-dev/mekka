import React, { useMemo, useContext, useCallback } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import { Ionicons } from '@expo/vector-icons';

// rgb(35, 35, 35)
const LocationsViewPostsBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['60%'], []);
  const {
    spaceMenuBottomSheetRef,
    currentSpaceAndUserRelationship,
    setCurrentSpaceAndUserRelationship,
    currentSpace,
    setCurrentSpace,
  } = useContext(GlobalContext);
  // const { navigation } = useContext(HomeStackNavContext);
  const { locationsViewPostsBottomSheetRef, locationsViewPosts } = useContext(SpaceRootContext);

  // const renderItem = useCallback((item) => {
  //   return (

  //   )
  // },[])

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={locationsViewPostsBottomSheetRef}
      snapPoints={snapPoints}
      // backdropComponent={(backdropProps) => (
      //   <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      // )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: 'rgb(40, 40, 40)' }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => locationsViewPostsBottomSheetRef.current.close()}
          style={{ marginBottom: 10, marginLeft: 10 }}
        >
          <Ionicons name='close-circle' size={30} color='white' />
        </TouchableOpacity>
        {/* {locationsViewPosts.length ? <FlatList data={locationsViewPosts} renderItem={renderItem} keyExtractor={(item) => item._id} /> : null } */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default LocationsViewPostsBottomSheet;
