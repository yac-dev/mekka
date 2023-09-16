import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const Overview = () => {
  const { currentSpace } = useContext(GlobalContext);
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(170, 170, 170)' }}>{d}</Text>;
  };

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 3);
    // console.log(e.nativeEvent);
  }, []);

  const renderReactions = (space) => {
    const list = space.reactions.map((reaction, index) => {
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
        <Text style={{ color: 'white' }}>You'll use </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>{list}</View>
        <Text style={{ color: 'white' }}>to react each post.</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(30, 30, 30)', padding: 10 }}>
      <ScrollView>
        <View style={{ marginBottom: 20 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FastImage
                source={{ uri: currentSpace.createdBy.avatar }}
                style={{ width: 30, height: 30, borderRadius: 20, marginRight: 10 }}
              />
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{currentSpace.createdBy.name}</Text>
            </View>
            {renderDate(currentSpace.createdAt)}
          </View>
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 3}
            style={{ color: 'white', lineHeight: 22, padding: 5 }}
          >
            {currentSpace.description}
          </Text>
          {lengthMore ? (
            <Text
              onPress={toggleNumberOfLines}
              style={{ marginTop: 10, color: 'rgb(170,170,170)', alignSelf: 'flex-end' }}
            >
              {textShown ? 'Read less' : 'Read more'}
            </Text>
          ) : null}
        </View>
        <View>
          <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 20, color: 'white' }}>Space feature</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <MaterialIcons name='photo-library' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
            <Text style={{ color: 'white' }}>{`You can post ${
              currentSpace.contentType === 'photo'
                ? 'only Photos'
                : currentSpace.contentType === 'video'
                ? 'Videos'
                : 'Photos and Videos'
            }.`}</Text>
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
            {renderReactions(currentSpace)}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <Foundation name='comments' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
            <Text style={{ color: 'white' }}>
              {currentSpace.isCommentAvailable ? 'Comments are available.' : 'Comments are not available.'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <FastImage
              source={require('../../../assets/forApp/ghost.png')}
              style={{ width: 25, height: 25, marginRight: 15 }}
              tintColor={'rgb(130,130,130)'}
            />
            <Text style={{ color: 'white' }}>
              {currentSpace.disappearAfter
                ? `Momento will be disappeared after ${currentSpace.disappearAfter} minutes`
                : 'Comments are not available.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Overview;
