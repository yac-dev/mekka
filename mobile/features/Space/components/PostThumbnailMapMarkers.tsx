import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Marker } from 'react-native-maps';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import FastImage from 'react-native-fast-image';

const PostThumbnailMapMarkers = () => {
  const { posts, selectedTag, navigation } = useContext(SpaceRootContext);
  console.log(posts);

  const renderPostThumbnailMarkers = () => {
    if (posts[selectedTag?._id]?.length) {
      const list = posts[selectedTag._id].map((post, index) => {
        if (post.location) {
          return (
            <Marker
              key={`${index}`}
              tracksViewChanges={false}
              coordinate={{ latitude: post.location.coordinates[1], longitude: post.location.coordinates[0] }}
              pinColor='black'
              onPress={() => {
                // getSelectedMeetup(meetup._id);
                navigation.navigate('ViewPost', { post });
              }}
            >
              <TouchableOpacity style={{ width: 45, height: 45 }}>
                <FastImage
                  // onLoad={() => setInitialRender(false)}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={{
                    uri: post.content.data,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableOpacity>
            </Marker>
          );
        } else {
          return null;
        }
      });
      return <>{list}</>;
    } else {
      return null;
    }
  };

  return <>{renderPostThumbnailMarkers()}</>;
};

export default PostThumbnailMapMarkers;
