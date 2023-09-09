import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

const MediaStats = () => {
  const { isIpad, spaceMenuBottomSheetRef, currentSpaceAndUserRelationship, currentSpace } = useContext(GlobalContext);

  const renderReactions = () => {
    const list = currentSpace.reactions.map((reaction, index) => {
      if (reaction) {
        if (reaction.type === 'emoji') {
          return (
            <Text key={index} style={{ fontSize: 20 }}>
              {reaction.emoji}
            </Text>
          );
        } else if (reaction.type === 'sticker') {
          return <FastImage key={index} source={{ uri: reaction.sticker.url }} style={{ width: 20, height: 20 }} />;
        }
      } else {
        return null;
      }
    });

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>You can use </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>{list}</View>
        <Text style={{ color: 'white' }}>to react to each post. </Text>
      </View>
    );
  };

  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <MaterialIcons name='photo-library' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
        <Text style={{ color: 'white' }}>{`You can post ${
          currentSpace.contentType === 'photo'
            ? 'only Photos'
            : currentSpace.contentType === 'video'
            ? 'Videos'
            : 'Photos and Videos'
        } in this space.`}</Text>
      </View>
      {currentSpace.videoLength ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Ionicons name='play-circle-sharp' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
          <Text
            style={{ color: 'white' }}
          >{`You can post at most ${currentSpace.videoLength} seconds length videos.`}</Text>
        </View>
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Fontisto name='smiley' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
        {renderReactions()}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Foundation name='comments' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
        <Text style={{ color: 'white' }}>
          {currentSpace.isCommentAvailable ? 'Comments are available.' : 'Comments are not available.'}
        </Text>
      </View>
    </View>
  );
};

export default MediaStats;
{
  /* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
<MaterialCommunityIcons name='ghost' size={20} color='white' style={{ marginRight: 15 }} />
<Text style={{ color: 'white' }}>Permanent</Text>
</View> */
}
