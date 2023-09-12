import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import backendAPI from '../../../apis/backend';
import { SpaceDetailContext } from '../contexts/SpaceDetailContext';
import Header from '../components/SpaceDetail/Header';
import Stats from '../components/SpaceDetail/Stats';
import Description from '../components/SpaceDetail/Description';
import ContentType from '../components/SpaceDetail/ContentType';
import Disapper from '../components/SpaceDetail/Disapper';
import Reactions from '../components/SpaceDetail/Reactions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext } from '../../../contexts/GlobalContext';

// props.route.params.spaceIdでくるよね。
interface RouterProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any> | undefined;
}

type StickerType = {
  _id: string;
  url: string;
  name: string;
};

type ReactionType = {
  _id: string;
  type: 'emoji' | 'sticker';
  emoji: string | null;
  sticker: StickerType | null;
};

type UserType = {
  _id: string;
  name: string;
  avatar: string;
};

type SpaceType = {
  _id: string;
  name: string;
  icon: string;
  contentType: string;
  videoLength: number;
  disappearAfter: number;
  isPublic: boolean;
  isCommentAvailable: boolean;
  isReactionAvailable: boolean;
  reactions: ReactionType[];
  totalPosts: number;
  totalMembers: number;
  rate: number;
  createdBy: UserType;
  createdAt: string;
};

// ここに、spaceのthumbnailから始まり、
const SpaceDetail: React.FC<RouterProps> = (props) => {
  const { spaceAndUserRelationships } = useContext(GlobalContext);
  const [space, setSpace] = useState(null);
  const [isSpaceFetched, setIsSpaceFetched] = useState(false);
  const [isJoinValidated, setIsJoinValidated] = useState(false);

  const getSpace = async () => {
    const result = await backendAPI.get(`/spaces/${props.route.params.spaceId}`);
    const { space } = result.data;
    setSpace(space);
    setIsSpaceFetched(true);
  };

  // join button validation
  useEffect(() => {
    for (let i = 0; i < spaceAndUserRelationships.length; i++) {
      if (spaceAndUserRelationships[i]._id === props.route.params.spaceId) {
        setIsJoinValidated(false);
      }

      if (i === spaceAndUserRelationships.length - 1) {
        if (spaceAndUserRelationships[i]._id === props.route.params.spaceId) {
          setIsJoinValidated(false);
        } else {
          setIsJoinValidated(true);
        }
      }
    }
  }, []); // 違うaccount作って試さないとな。

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => console.log('join')}
          style={{
            backgroundColor: isJoinValidated ? 'white' : 'rgb(150,150,150)',
            borderRadius: 20,
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          disabled={isJoinValidated ? false : true}
        >
          <MaterialCommunityIcons name='human-greeting-variant' size={20} color='black' />
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            Join
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    getSpace();
  }, []);

  return (
    <SpaceDetailContext.Provider value={{ space, navigation: props.navigation }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'rgb(38, 38, 38)' }}>
        {isSpaceFetched && space ? (
          <>
            <Header />
            <Stats />
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Description />
              <ContentType />
              <Disapper />
              <Reactions />
            </View>
            {/* <TouchableOpacity onPress={() => props.navigation.navigate('Members')}>
              <Text style={{ color: 'white' }}>Press to route members</Text>
            </TouchableOpacity> */}
            {/* <View style={{ width: '100%', position: 'absolute', bottom: 0, padding: 10, backgroundColor: 'red' }}>
              <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 8 }}>
                <Text style={{ color: 'white' }}>Join this space</Text>
              </TouchableOpacity>
            </View> */}
          </>
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </SpaceDetailContext.Provider>
  );
};

export default SpaceDetail;
