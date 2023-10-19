import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import backendAPI from '../../../apis/backend';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ReactionPickerContext } from '../contexts/ReactionPickerContext';
import SnackBar from '../../../components/SnackBar';
import { Ionicons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

const Stickers = () => {
  const { isIpad, setSnackBar } = useContext(GlobalContext);
  const { selectedReactions, setSelectedReactions } = useContext(ReactionPickerContext);
  const [stickers, setStickers] = useState([]);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 15 : Dimensions.get('window').width / 9;

  const getStickers = async () => {
    const result = await backendAPI.get('/stickers');
    const { stickers } = result.data;
    setStickers(stickers);
  };

  useEffect(() => {
    getStickers();
  }, []);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              // backgroundColor: selectedReactions[item] ? 'white' : 'black',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              // setSelectedReaction({ type: 'emoji', emoji: emoji, sticker: undefined });
              if (selectedReactions[item]) {
                setSelectedReactions((previous) => {
                  const updating = { ...previous };
                  delete updating[item];
                  return updating;
                });
              } else {
                if (Object.keys(selectedReactions).length >= 6) {
                  setSnackBar({
                    isVisible: true,
                    barType: 'warning',
                    message: 'OOPS. The number of reaction options is limited to 6 at most.',
                    duration: 5000,
                  });
                } else {
                  setSelectedReactions((previous) => {
                    return {
                      ...previous,
                      [item._id]: {
                        type: 'sticker',
                        emoji: undefined,
                        sticker: item,
                      },
                    };
                  });
                }
              }
            }}
          >
            <FastImage source={{ uri: item.url }} style={{ width: 25, height: 25 }} />
            {selectedReactions[item] ? (
              <View style={{ position: 'absolute', top: -5, right: -5 }}>
                <Ionicons name='checkmark-circle' color='green' size={15} />
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      );
    },
    [selectedReactions]
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <FlatList data={stickers} renderItem={renderItem} keyExtractor={(item, index) => `${item._id}`} numColumns={9} />
    </View>
  );
};

export default Stickers;
