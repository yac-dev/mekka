import React, { useContext, useCallback, useState, useEffect } from 'react';
import { View, Text, Dimensions, FlatList } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import backendAPI from '../../../apis/backend';
import PostThumbnail from '../components/PostThumbnail';

const Gallery = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const result = await backendAPI.get(`/posts/space/${props.route?.params?.spaceId}`);
    const { posts } = result.data;
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const renderItem = useCallback((post) => {
    return (
      <View>
        <PostThumbnail post={post} />
      </View>
    );
  }, []);
  // const renderItem = useCallback((post) => {
  //   if (post.content.type === 'photo') {
  //     return (
  //       <View style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}>
  //         <FastImage
  //           style={{ width: '100%', height: '100%', borderRadius: 7 }}
  //           source={{
  //             uri: asset.data,
  //             priority: FastImage.priority.normal,
  //           }}
  //           resizeMode={FastImage.resizeMode.stretch}
  //         />
  //         <View style={{ position: 'absolute', top: 10, right: 10 }}>
  //           <Ionicons name='camera' size={25} color={'white'} />
  //         </View>
  //       </View>
  //     );
  //   } else if (asset.type === 'video') {
  //     return (
  //       <View style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}>
  //         <Video
  //           style={{ width: '100%', height: '100%', borderRadius: 7 }}
  //           source={{
  //             uri: asset.data,
  //           }}
  //           useNativeControls={false}
  //           resizeMode='stretch'
  //           isLooping={false}
  //         />
  //         <View style={{ position: 'absolute', top: 10, right: 10 }}>
  //           <Ionicons name='videocam' size={25} color={iconColorsTable[videoTypesTable[asset.effect]]} />
  //         </View>
  //       </View>
  //     );
  //   }
  // }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Text style={{ color: 'white' }}>Gallerty in here</Text>
      {posts.length ? (
        <FlatList
          numColumns={3}
          data={posts}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item._id}
        />
      ) : null}
    </View>
  );
};

export default Gallery;
