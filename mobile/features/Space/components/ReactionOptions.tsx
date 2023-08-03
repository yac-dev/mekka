import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ReactionsContext } from '../contexts/ReactionsContext';
import { RouteProp, ParamListBase } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import backendAPI from '../../../apis/backend';

type ReactionsProps = {
  route: RouteProp<ParamListBase, string> | undefined;
};

type ReactionType = {
  _id: string;
  emoji: string;
  emojiType: string;
};

type ReactionStatusType = {
  _id: string;
  post: string;
  reaction: ReactionType;
  count: number;
};

const ReactionOptions = () => {
  const { authData } = useContext(GlobalContext);
  const { reactionStatuses, setReactionStatuses } = useContext(ReactionsContext);
  console.log(JSON.stringify(reactionStatuses, null, 4));

  const upvoteReaction = async (reactionStatus: ReactionStatusType, index: number) => {
    const result = await backendAPI.post(
      `/userandreactionrelationships/user/${authData._id}/post/${reactionStatus.post}`,
      { reactionId: reactionStatus.reaction._id }
    );
    setReactionStatuses((previous) => {
      const updating = [...previous];
      updating[index].count++;
      return updating;
    });
  };

  // とりあえず、1以上のものだけ、0のものをextractする感じでいいか。
  const renderReactionStatuses = () => {
    if (reactionStatuses.length) {
      const list = reactionStatuses.map((reactionStatus, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: 'rgb(70, 70, 70)',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              padding: 5,
              marginBottom: 10,
            }}
            onPress={() => upvoteReaction(reactionStatus, index)}
          >
            {reactionStatus.reaction.emojiType === 'normal' ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, marginRight: reactionStatus.count ? 10 : 0 }}>
                  {reactionStatus.reaction.emoji}
                </Text>
                {reactionStatus.count ? <Text style={{ color: 'white' }}>{reactionStatus.count}</Text> : null}
              </View>
            ) : (
              <Text>Custom here</Text>
            )}
            {reactionStatus.count ? null : (
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: 'green',
                  borderRadius: 8,
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons name='plus' size={15} color='white' />
              </View>
            )}
          </TouchableOpacity>
        );
      });

      return (
        <View
          style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.3, borderBottomColor: 'white' }}
        >
          {list}
        </View>
      );
    } else {
      return <Text style={{ color: 'white' }}>No reactions</Text>;
    }
  };
  // const renderReactionStatues = () => {
  //   if (reactionStatuses.length) {
  //     const countMoreThanOne = [];
  //     const countZero = [];
  //     for (let reactionStatus of reactionStatuses) {
  //       if (reactionStatus.count >= 1) {
  //         countMoreThanOne.push(reactionStatus);
  //       } else if (!reactionStatus.count) {
  //         countZero.push(reactionStatus);
  //       }
  //     }

  //     const listMoreThanOne = countMoreThanOne.map((reactionStatus, index) => {
  //       return (
  //         <TouchableOpacity
  //           key={index}
  //           style={{
  //             backgroundColor: 'rgb(70, 70, 70)',
  //             borderRadius: 10,
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             marginRight: 10,
  //             padding: 5,
  //             marginBottom: 10,
  //           }}
  //         >
  //           {reactionStatus.reaction.emojiType === 'normal' ? (
  //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //               <Text style={{ fontSize: 30, marginRight: 10 }}>{reactionStatus.reaction.emoji}</Text>
  //               <Text style={{ color: 'white' }}>{reactionStatus.count}</Text>
  //             </View>
  //           ) : (
  //             <Text>Custom here</Text>
  //           )}
  //         </TouchableOpacity>
  //       );
  //     });

  //     const listZeros = countZero.map((reactionStatus, index) => {
  //       return (
  //         <TouchableOpacity
  //           key={index}
  //           style={{
  //             backgroundColor: 'rgb(70, 70, 70)',
  //             borderRadius: 10,
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             marginRight: 10,
  //             padding: 5,
  //             marginBottom: 10,
  //           }}
  //           onPress={() =>
  //             setReactionStatuses((previous) => {
  //               const updating = [...previous];

  //             })
  //           }
  //         >
  //           {reactionStatus.reaction.emojiType === 'normal' ? (
  //             <Text style={{ fontSize: 30 }}>{reactionStatus.reaction.emoji}</Text>
  //           ) : (
  //             <Text>Custom here</Text>
  //           )}
  //           <View
  //             style={{
  //               width: 16,
  //               height: 16,
  //               backgroundColor: 'green',
  //               borderRadius: 8,
  //               position: 'absolute',
  //               top: -5,
  //               right: -5,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //             }}
  //           >
  //             <MaterialCommunityIcons name='plus' size={15} color='white' />
  //           </View>
  //         </TouchableOpacity>
  //       );
  //     });

  //     return (
  //       <View
  //         style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.3, borderBottomColor: 'white' }}
  //       >
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //             marginBottom: 10,
  //           }}
  //         >
  //           {listMoreThanOne}
  //         </View>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //             marginBottom: 10,
  //           }}
  //         >
  //           {listZeros}
  //         </View>
  //       </View>
  //     );
  //   } else {
  //     return <Text style={{ color: 'white' }}>No reactions</Text>;
  //   }
  // };

  return <>{renderReactionStatuses()}</>;
};

export default ReactionOptions;
