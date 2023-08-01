import React, { useContext } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { SpaceContext } from '../contexts/SpaceContext';

const Posts = () => {
  const { isIpad } = useContext(GlobalContext);
  const { posts } = useContext(SpaceContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 4 : Dimensions.get('window').width / 2;

  // これをさ、左右スライド式にしたいわけだが、、、、こういうlibraryって何があるだろう。carouselかな？？
  const renderContents = (contents) => {
    const list = contents.map((content, index) => {
      return (
        <View>
          {content.type === 'photo' ? (
            <Image source={{ uri: content.data }} style={{ width: oneGridWidth }} />
          ) : (
            <Text>Video here</Text>
          )}
        </View>
      );
    });
  };

  // reactionのoptionをどこにーーー。
  const renderPosts = () => {
    const list = posts.map((post, index) => {
      return (
        <View key={index}>
          {}
          <Text style={{ color: 'white' }}>{post.contents[0].data}</Text>
          <Text style={{ color: 'white' }}>{post.caption}</Text>
        </View>
      );
    });

    return <View>{list}</View>;
  };

  return <View>{renderPosts()}</View>;
};

export default Posts;
