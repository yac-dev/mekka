import React, { useState, useContext, useEffect, forwardRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { ViewPostContext } from '../contexts/ViewPostContext';
import { FadingTransition } from 'react-native-reanimated';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';

const Content = forwardRef(({ post }, parentRef) => {
  // const { post, setIsPostFetched, isPostFetched } = useContext(ViewPostContext);
  // const [viewingContent, setViewingContent] = useState('');
  // const {} = useContext(SpaceRootContext)

  // const renderContentOptions = () => {
  //   if (post.contents.length >= 2) {
  //     const list = post.contents.map((content, index) => {
  //       // return (
  //       //   <TouchableOpacity
  //       //     key={index}
  //       //     style={{
  //       //       marginRight: 10,
  //       //       borderRadius: 11,
  //       //       borderWidth: viewingContent._id === content._id ? 3 : null,
  //       //       borderColor: viewingContent._id === content._id ? 'blue' : null,
  //       //     }}
  //       //     onPress={() => setViewingContent(content)}
  //       //   >
  //       //     <FastImage source={{ uri: content.data }} style={{ width: 50, height: 50, borderRadius: 8 }} />
  //       //   </TouchableOpacity>
  //       // );
  //       if (content.type === 'video') {
  //         return (
  //           <TouchableOpacity
  //             key={index}
  //             style={{ width: 50, height: 50, marginRight: 10 }}
  //             onPress={() => setViewingContent(content)}
  //           >
  //             {/* { name: 'Photos', params: { createdPost: post }, merge: true } */}
  //             <Video source={{ uri: content.data }} style={{ width: '100%', height: '100%', borderRadius: 11 }} />
  //           </TouchableOpacity>
  //         );
  //       } else {
  //         return (
  //           <TouchableOpacity
  //             key={index}
  //             style={{ width: 50, height: 50, marginRight: 10 }}
  //             onPress={() => setViewingContent(content)}
  //           >
  //             <FastImage source={{ uri: content.data }} style={{ width: '100%', height: '100%', borderRadius: 11 }} />
  //           </TouchableOpacity>
  //         );
  //       }
  //     });

  //     return (
  //       <ScrollView horizontal={true} style={{ marginBottom: 10 }}>
  //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
  //       </ScrollView>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  if (post.content.type === 'video') {
    return (
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Video source={{ uri: post.content.data }} style={{ width: '100%' }} />
        {/* <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>{renderContentOptions()}</View> */}
      </View>
    );
  } else if (post.content.type === 'photo') {
    return (
      <View style={{}}>
        <FastImage
          source={{ uri: post.content.data }}
          style={{ width: '100%', aspectRatio: 1, marginBottom: 10 }}
          resizeMode='cover'
        />
        {/* <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>{renderContentOptions()}</View> */}
      </View>
    );
  }
});

export default Content;
