import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import * as ImagePicker from 'expo-image-picker';
import AddPhoto from '../components/AddPhoto';
import AddCaption from '../components/AddCaption';
import AddLocation from '../components/AddLocation';
import AddTags from '../components/AddTags';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import backendAPI from '../../../apis/backend';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import SnackBar from '../../../components/SnackBar';

const NormalPost = () => {
  const { isIpad, setSnackBar } = useContext(GlobalContext);
  const { contents, setContents, caption, setCaption, space, navigation, addedTags } = useContext(CreateNewPostContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  // const { authData, setLoading, setSnackBar } = useContext(GlobalContext);
  // const [formData, setFormData] = useState({
  //   contents: [],
  //   caption: '',
  //   location: { type: 'Point', coordinates: [] },
  //   addedTags: {},
  //   createdTags: [],
  //   addedLocationTag: null,
  //   createdLocationTag: null,
  // });
  // // const [createdTags, setCreatedTags] = useState([]);
  // const [tagOptions, setTagOptions] = useState({});
  // const [locationTagOptions, setLocationTagOptions] = useState([]);

  // useEffect(
  //   () => {
  //     navigation.setOptions({
  //       headerRight: () => (
  //         <TouchableOpacity
  //           onPress={() => navigation.navigate('AddTags')}
  //           disabled={contents.length && caption.length ? false : true}
  //         >
  //           <Text
  //             style={{
  //               color: contents.length && caption.length ? 'white' : 'rgb(170,170,170)',
  //               fontSize: 20,
  //               fontWeight: 'bold',
  //             }}
  //           >
  //             Next
  //           </Text>
  //         </TouchableOpacity>
  //       ),
  //       headerLeft: () => (
  //         <TouchableOpacity onPress={() => navigation.navigate('SelectPostType')}>
  //           <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
  //         </TouchableOpacity>
  //       ),
  //     });
  //   },
  //   [contents, caption],
  //   addedTags
  // );

  // const getTags = async () => {
  //   const result = await backendAPI.get(`/spaces/${props.route.params.space._id}/tags`);
  //   const { tags } = result.data;
  //   setTagOptions(() => {
  //     const table = {};
  //     tags.forEach((tag, index) => {
  //       table[tag._id] = tag;
  //     });

  //     return table;
  //   });
  // };

  // const getLocationTags = async () => {
  //   const result = await backendAPI.get(`/spaces/${props.route.params.space._id}/locationtags`);
  //   const { locationTags } = result.data;
  //   setLocationTagOptions(locationTags);
  //   // setLocationTagOptions(() => {
  //   //   const table = {};
  //   //   locationTags.forEach((locationTag, index) => {
  //   //     table[locationTag._id] = locationTag;
  //   //   });

  //   //   return table;
  //   // });
  // };

  // useEffect(() => {
  //   getTags();
  //   getLocationTags();
  // }, []);

  // ここまじで謎だよなー。なんで毎回undefinedになるんだろうか。。。
  // 💡 必ず、paramsを"merge"しろ。じゃないと、objectを上書きしちまう。
  // const onDonePress = async () => {
  //   // console.log('this is the space object', JSON.stringify(props.route?.params?.space._id));
  //   // console.log('this is the space reactios', props.route?.params?.space.reactions);
  //   try {
  //     const payload = new FormData();
  //     payload.append('reactions', JSON.stringify(props.route?.params?.space.reactions));
  //     payload.append('caption', formData.caption);
  //     payload.append('createdTags', JSON.stringify(formData.createdTags));
  //     payload.append('addedTags', JSON.stringify(Object.keys(formData.addedTags)));
  //     payload.append('createdLocationTag', JSON.stringify(formData.createdLocationTag)); // これがない場合もある。
  //     // payload.append('location', JSON.stringify(formData.location));
  //     // payload.append('addedLocationTag', formData.addedLocationTag ? formData.addedLocationTag._id : '');
  //     if (formData.addedLocationTag) {
  //       payload.append('addedLocationTag', JSON.stringify(formData.addedLocationTag?._id)); // ない場合もある。
  //     } else {
  //       payload.append('addedLocationTag', '');
  //     }
  //     // payload.append('disappearAfter', props.route?.params?.space.disappearAfter);
  //     payload.append('createdBy', authData._id);
  //     payload.append('spaceId', props.route?.params?.space._id);
  //     for (let content of formData.contents) {
  //       const obj = {
  //         name: content.uri.split('/').pop(),
  //         uri: content.uri,
  //         type: content.type === 'image' ? 'image/jpg' : 'video/mp4',
  //       };
  //       payload.append('contents', JSON.parse(JSON.stringify(obj)));
  //     }
  //     console.log(payload);
  //     setLoading(true);
  //     const result = await backendAPI.post('/posts', payload, {
  //       headers: { 'Content-type': 'multipart/form-data' },
  //     });
  //     setLoading(false);
  //     const { post } = result.data;
  //     setSnackBar({
  //       isVisible: true,
  //       barType: 'success',
  //       message: 'Post has been created successfully.',
  //       duration: 7000,
  //     });
  //     //ここのcomponentは、photos. video or photoAndVideoどれかになる。
  //     // なるほど、戻る時に必要になるのか。。。でもなーーーー。
  //     props.navigation.navigate({
  //       name: `Space_${props.route?.params?.spaceAndUserRelationship._id}`,
  //       params: { afterPosted: true }, // 作ったtagをSpaceRootに入れる。
  //       merge: true,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // <TouchableOpacity
  //         style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
  //         onPress={() => props.navigation.navigate({ name: 'ViewPost', params: { post } })}
  //       >
  //         <Video source={{ uri: post.content.data }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />;
  //       </TouchableOpacity>

  const renderContents = () => {
    const list = contents.map((content, index) => {
      return (
        <View key={index} style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}>
          {content.type === 'image' ? (
            <FastImage
              source={{ uri: content.uri }}
              style={{ width: '100%', height: '100%', borderRadius: 12, marginRight: 10 }}
            />
          ) : (
            <Video
              source={{ uri: content.uri }}
              style={{ width: '100%', height: '100%', borderRadius: 12, marginRight: 10 }}
            />
          )}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: -10,
              right: 0,
              backgroundColor: 'red',
              width: 30,
              height: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>
              setContents((previous) => {
                const updating = [...previous];
                const updated = updating.filter((content, idx) => index !== idx);
                return updated;
              })
            }
          >
            <Ionicons name='trash' size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 }}>
        {contents.length >= 6 ? null : (
          <TouchableOpacity
            style={{
              backgroundColor: 'rgb(80,80,80)',
              justifyContent: 'center',
              alignItems: 'center',
              width: oneAssetWidth,
              height: oneAssetWidth,
              padding: 2,
              borderRadius: 20,
            }}
            onPress={() => pickContents()}
          >
            <AntDesign name='plus' size={30} color='white' style={{ marginBottom: 10 }} />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Add</Text>
          </TouchableOpacity>
        )}

        {/* {contents.length && list} この記法、react native ではダメらしい。reactではいいんだけど。。。 */}
        {/* Error: Text strings must be rendered within a <Text> component.って言われる。 */}
        {contents.length ? list : null}
      </View>
    );
  };

  const renderContentType = useCallback(() => {
    if (space.contentType === 'photo') {
      return <Text style={{ color: 'white' }}>Photo</Text>;
    } else if (space.contentType === 'video') {
      return <Text style={{ color: 'white' }}>Video</Text>;
    } else {
      return <Text style={{ color: 'white' }}>Photos or videos</Text>;
    }
  }, []);

  const pickContents = async () => {
    const pickerOption = {
      mediaTypes:
        space.contentType === 'photo'
          ? ImagePicker.MediaTypeOptions.Images
          : space.contentType === 'video'
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
      // duration: space.videoLength ? space.videoLength : 3000,
    };
    let result = await ImagePicker.launchImageLibraryAsync(pickerOption);
    if (!result.canceled && result.assets) {
      // result assets それぞれのassetに対して、dataを作る様にすると。
      setContents((previous) => {
        console.log(result.assets);
        const adding = [];
        result.assets.forEach((asset) => {
          if (asset.type === 'video') {
            // 基本は, videoの時はdurationがspaceのvideo length以下の時だけ入れる様にする。
            if (asset.duration / 1000 <= space.videoLength) {
              adding.push({ uri: asset.uri, type: 'video', duration: asset.duration ? asset.duration : null });
            } else {
              // addingのarrayに入れないで、snacbarを出してあげる。無理ですって。
              setSnackBar({
                isVisible: true,
                barType: 'warning',
                message: `OOPS. Video length is limited to ${space.videoLength} in this space.`,
                duration: 5000,
              });
            }
          } else if (asset.type === 'image') {
            adding.push({ uri: asset.uri, type: 'image', duration: asset.duration ? asset.duration : null });
          }
        });

        return [...previous, ...adding];
      });

      // Determine media type based on file extension
      // if (uri.endsWith('.jpg') || uri.endsWith('.png')) {
      //   // The picked content is a photo.
      //   console.log('Picked photo:', uri);
      // } else if (uri.endsWith('.mp4') || uri.endsWith('.mov')) {
      //   // The picked content is a video.
      //   console.log('Picked video:', uri);
      // } else {
      //   console.log('Unknown media type:', uri);
      // }

      // setFormData((previous) => {
      //   return {
      //     ...previous,
      //     photos: [...previous.photos, result.assets[0].uri],
      //   };
      // });
    }
  };

  return (
    // <CreateNewPostContext.Provider
    //   value={{
    //     formData,
    //     setFormData,
    //     navigation: props.navigation,
    //     route: props.route,
    //     tagOptions,
    //     setTagOptions,
    //     locationTagOptions,
    //     setLocationTagOptions,
    //     spaceAndUserRelationship: props.route.params.spaceAndUserRelationship,
    //     space: props.route?.params?.space,
    //   }}
    // >
    <KeyboardAvoidingView
      // これ動かねーな。
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: 'black' }}
      // keyboardVerticalOffset={Platform.select({
      //   ios: Header.HEIGHT, // iOS
      //   android:Header.HEIGHT + StatusBar.currentHeight, // android
      // })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
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
              Normal post
            </Text>
            <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
              Firstly, please select {renderContentType()}
            </Text>
          </View>
          {renderContents()}
          <TextInput
            style={{
              // backgroundColor: 'rgb(88, 88, 88)',
              padding: 10,
              // borderRadius: 5,
              marginBottom: 20,
              color: 'white',
              borderBottomColor: 'rgb(88, 88, 88)',
              borderBottomWidth: 1,
            }}
            placeholder='Add caption...'
            placeholderTextColor={'rgb(170,170,170)'}
            autoCapitalize='none'
            value={caption}
            onChangeText={(text) => setCaption(text)}
          />
          <SnackBar />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    // </CreateNewPostContext.Provider>
  );
};

export default NormalPost;
