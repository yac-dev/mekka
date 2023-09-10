import React, { useContext, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GlobalContext } from '../../../contexts/GlobalContext';

const Header = () => {
  const { currentSpaceAndUserRelationship, spaceMenuBottomSheetRef, currentSpace } = useContext(GlobalContext);
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  const onInvitePress = async () => {
    spaceMenuBottomSheetRef?.current.close();
    const result = await Share.share({
      message: `Invite friend to Space.${'\n'}Download link: https://apps.apple.com/us/app/lampost/id1668526833${'\n'}And then enter the secret key to join this space.${'\n'}Secret key: kokokoko`,
    });
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ height: 200, width: '100%', marginBottom: 20 }}>
        <FastImage
          source={{ uri: currentSpaceAndUserRelationship.space.icon }}
          style={{ width: '100%', height: '100%' }}
        />
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23, position: 'absolute', bottom: 10, left: 10 }}>
          {currentSpaceAndUserRelationship.space.name}
        </Text>
      </View>
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
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
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 15, color: 'white' }}>Description</Text>
        <Text onTextLayout={onTextLayout} numberOfLines={textShown ? undefined : 3} style={{ color: 'white' }}>
          {currentSpace.description}
        </Text>
        {lengthMore ? (
          <Text
            onPress={toggleNumberOfLines}
            style={{ marginTop: 10, color: 'rgb(170,170,170)', alignSelf: 'flex-end' }}
          >
            {textShown ? 'Read less...' : 'Read more...'}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default Header;
