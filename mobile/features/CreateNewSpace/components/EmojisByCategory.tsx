import React, { useCallback, memo, useContext } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { emojisByCategory } from '../../../utils/Emoji/emojis';
import shortnameToUnicode from '../../../utils/Emoji/shortNameToUnicode';
import { GlobalContext } from '../../../contexts/GlobalContext';

const EmojisByCategory = ({ category }) => {
  const { isIpad } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 15 : Dimensions.get('window').width / 9;
  const renderItem = useCallback(({ item }) => {
    return (
      // <TouchableOpacity>
      //   <Text>{shortnameToUnicode[`:${item}:`]}</Text>
      // </TouchableOpacity>
      <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          //  onPress={() => {
          //    // setSelectedReaction({ type: 'emoji', emoji: emoji, sticker: undefined });
          //    setSelectedReactions((previous) => [...previous, item]);
          //    setEmojiOptions((previous) => {
          //      const updating = [...previous];
          //      return updating.filter((element) => element !== item);
          //    });
          //  }}
        >
          <Text style={{ fontSize: 35 }}>{shortnameToUnicode[`:${item}:`]}</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <FlatList
        data={emojisByCategory[category]}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={9}
      />
    </View>
  );
};

export default memo(EmojisByCategory);
