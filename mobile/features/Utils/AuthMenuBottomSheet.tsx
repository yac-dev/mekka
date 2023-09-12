import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import * as SecureStore from 'expo-secure-store';
import { GlobalContext } from '../../contexts/GlobalContext';

const AuthMenuBottomSheet = () => {
  const snapPoints = useMemo(() => ['50%'], []);
  const {
    authData,
    isAuthenticated,
    authMenuBottomSheetRef,
    setAuthData,
    setIsAuthenticated,
    setLoading,
    setSpaceAndUserRelationships,
    setSnackBar,
  } = useContext(GlobalContext);

  const onLogoutPress = async () => {
    setLoading(true);
    await SecureStore.deleteItemAsync('secure_token');
    setAuthData({ _id: '', name: '', email: '', avatar: '' });
    setIsAuthenticated(false);
    setSpaceAndUserRelationships([]);
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Logged out successfully.',
      duration: 5000,
    });
    // props.navigation.navigate('Welcome');
  };

  if (isAuthenticated) {
    return (
      <GorhomBottomSheet
        index={-1}
        enableOverDrag={true}
        ref={authMenuBottomSheetRef}
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
          <TouchableOpacity onPress={() => onLogoutPress()}>
            <Text style={{ color: 'white' }}>Logout</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

export default AuthMenuBottomSheet;
