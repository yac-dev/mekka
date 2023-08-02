import React, { useContext } from 'react';
import { View, Text, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { SpaceContext } from '../contexts/SpaceContext';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';

type ContentType = {
  _id: string;
  data: string;
  type: string;
};

const Posts = () => {
  const { isIpad } = useContext(GlobalContext);
  const { posts, arePostsFetched } = useContext(SpaceContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 4 : Dimensions.get('window').width / 2;
  console.log(JSON.stringify(posts, null, 4));

  // これをさ、左右スライド式にしたいわけだが、、、、こういうlibraryって何があるだろう。carouselかな？？
  const renderContents = (contents: ContentType[]) => {
    const list = contents.map((content, index) => {
      return (
        <View key={index}>
          {content.type === 'photo' ? (
            <FastImage source={{ uri: content.data }} style={{ width: oneGridWidth, aspectRatio: 1 }} />
          ) : (
            <Video></Video>
          )}
        </View>
      );
    });

    return (
      <ScrollView horizontal={true}>
        <View style={{ flexDirection: 'row' }}>{list}</View>
      </ScrollView>
    );
  };

  // reactionのoptionをどこにーーー。
  const renderPosts = () => {
    if (posts.length) {
      const list = posts.map((post, index) => {
        return (
          <View key={index}>
            {renderContents(post.contents)}
            <Text style={{ color: 'white' }}>{post.caption}</Text>
          </View>
        );
      });

      return <View>{list}</View>;
    } else {
      return <Text style={{ color: 'white' }}>No posts yet</Text>;
    }
  };

  return <View>{arePostsFetched ? renderPosts() : <ActivityIndicator />}</View>;
};

export default Posts;
