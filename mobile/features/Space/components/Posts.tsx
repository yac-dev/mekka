import React, { useContext } from 'react';
import { View, Text, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { SpaceContext } from '../contexts/SpaceContext';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ContentType = {
  _id: string;
  data: string;
  type: string;
};

type UserType = {
  _id: string;
  name: string;
  avatar: string;
};

type PostType = {
  _id: string;
  contents: ContentType[];
  caption: string;
  spaceId: string;
  createdBy: UserType;
  createdAt: string;
};

const Posts = () => {
  const { isIpad } = useContext(GlobalContext);
  const { posts, arePostsFetched, navigation } = useContext(SpaceContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 4 : Dimensions.get('window').width / 2;
  // console.log(JSON.stringify(posts, null, 4));

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
      <ScrollView horizontal={true} style={{ marginBottom: 15 }}>
        <View style={{ flexDirection: 'row' }}>{list}</View>
      </ScrollView>
    );
  };

  // ここ, postの方がいいな。。。
  const renderHeader = (post: PostType) => {
    //まず、userがいるかいないかね。nullなら表示しない様にしたいわけ。
    if (post.createdBy) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <FastImage
            source={{ uri: post.createdBy.avatar }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
              backgroundColor: 'rgba(0, 108, 255, 0.85)',
              marginRight: 15,
            }}
            tintColor={'white'}
          />
          <View>
            <Text style={{ color: 'white', fontSize: 17 }}>{post.createdBy.name}</Text>
          </View>
        </View>
      );
    } else {
      return <Text style={{ color: 'white' }}>User has gone...</Text>;
    }
  };

  // reactionのoptionをどこにーーー。
  const renderPosts = () => {
    if (posts.length) {
      const list = posts.map((post, index) => {
        return (
          <View key={index} style={{ marginBottom: 30 }}>
            {renderHeader(post)}
            {renderContents(post.contents)}
            <View>
              <TouchableOpacity onPress={() => navigation?.navigate('Reactions', { postId: post._id })}>
                <MaterialCommunityIcons name='plus' size={20} color='white' />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontSize: 17 }}>{post.caption}</Text>
            </View>
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
