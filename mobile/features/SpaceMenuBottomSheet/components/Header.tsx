import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GlobalContext } from '../../../contexts/GlobalContext';

const Header = () => {
  const { currentSpaceAndUserRelationship, spaceMenuBottomSheetRef, currentSpace } = useContext(GlobalContext);

  const onInvitePress = async () => {
    // const snapshot = await mapRef.current.takeSnapshot({
    //   format: 'png',
    //   quality: 1,
    //   result: 'file',
    // });
    spaceMenuBottomSheetRef?.current.close();
    const result = await Share.share({
      message: `Invite friend to Space.${'\n'}Download link: https://apps.apple.com/us/app/lampost/id1668526833${'\n'}And then enter the secret key to join this space.${'\n'}Secret key: kokokoko`,
    });
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <FastImage
        source={{ uri: currentSpaceAndUserRelationship.space.icon }}
        style={{ width: '100%', height: 150, marginBottom: 20 }}
      />
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23, marginBottom: 10 }}>
          {currentSpaceAndUserRelationship.space.name}
        </Text>
        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: 'white' }}>4 members</Text>
          <TouchableOpacity
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: 'white',
              borderRadius: 20,
              marginRight: 15,
            }}
            onPress={() => onInvitePress()}
          >
            <Text style={{ fontWeight: 'bold' }}>Invite</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: 'white' }}>{currentSpace.description}</Text>
      </View>
    </View>
  );
};

export default Header;
