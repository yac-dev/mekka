import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MomentPost = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const { space } = props.route.params;
  const calcurateMinutes = () => {
    if (space.disappearAfter >= 60) {
      return <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>24 hours.</Text>;
    } else {
      return (
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{space.disappearAfter} minutes.</Text>
      );
    }
  };

  // const pickAndSendImage = async () => {
  //   const pickerOption = {
  //     mediaTypes:
  //       route?.params?.spaceAndUserRelationship.space.contentType === 'photo'
  //         ? ImagePicker.MediaTypeOptions.Images
  //         : route?.params?.spaceAndUserRelationship.space.contentType === 'video'
  //         ? ImagePicker.MediaTypeOptions.Videos
  //         : ImagePicker.MediaTypeOptions.All,
  //     allowsMultipleSelection: true,
  //     quality: 1,
  //     duration: route?.params?.spaceAndUserRelationship.space.videoLength ? 3000 : null,
  //   };
  //   let result = await ImagePicker.launchImageLibraryAsync(pickerOption);
  //   if (!result.canceled && result.assets) {
  //     // result assets それぞれのassetに対して、dataを作る様にすると。
  //     setFormData((previous) => {
  //       const addedAssets = result.assets.map((asset) => {
  //         return {
  //           uri: asset.uri,
  //           type: asset.type === 'image' ? 'image' : 'video',
  //           duration: asset.duration ? asset.duration : null,
  //         };
  //       });

  //       return {
  //         ...previous,
  //         contents: [...previous.contents, ...addedAssets],
  //       };
  //     });

  //   }
  // };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Create New Moment
        </Text>
        {/* 時間のとこだけ強調したいよね。 */}
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
            Moment is a story of IG. Instead of 24 hours rule, your post will be disappeared within
          </Text>
          {calcurateMinutes()}
        </View>
      </View>
      <View style={{ paddingTop: 10 }}>
        <TouchableOpacity
          style={{
            width: oneAssetWidth,
            aspectRatio: 1,
            backgroundColor: 'rgb(170,170,170)',
            borderRadius: 13,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='plus' size={40} color='white' />
          <Text style={{ color: 'white', fontSize: 20 }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MomentPost;
