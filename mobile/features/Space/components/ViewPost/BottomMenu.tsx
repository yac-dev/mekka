import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { GlobalContext } from '../../../../contexts/GlobalContext';
import { ViewPostContext } from '../../contexts/ViewPostContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const BottomMenu = () => {
  const { isIpad } = useContext(GlobalContext);
  const { navigation } = useContext(ViewPostContext);

  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  return (
    <ScrollView
      horizontal={true}
      style={{ backgroundColor: 'rgb(88,88,88)', position: 'absolute', width: '100%', bottom: 0 }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <View
          style={{
            width: oneGridWidth,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 10,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}
            // onPress={() =>
            //   // props.navigation.navigate('Add badges', { fromComponent: 'ADD_USER_BADGES', myBadges: userBadges })
            //   // badgeMenuBottomSheetRef.current.snapToIndex(0)
            //   props.navigation.navigate('Add badges', {
            //     fromComponent: 'ADD_USER_BADGES',
            //     myBadges: userBadges, // ここに原因がある。badgeidでのhash tableが必要になる。今は、それがまだできていない。
            //   })
            // }
          >
            <MaterialCommunityIcons name='plus' size={20} color={'yellow'} />
          </TouchableOpacity>

          <Text style={{ color: 'white', textAlign: 'center' }}>React</Text>
        </View>
        <View
          style={{
            width: oneGridWidth,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 10,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}
            onPress={() => navigation?.navigate('Comments')}
          >
            <Entypo name='feather' size={20} color={'yellow'} />
          </TouchableOpacity>

          <Text style={{ color: 'white', textAlign: 'center' }}>Comments</Text>
        </View>
        <View
          style={{
            width: oneGridWidth,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 10,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}
            // onPress={() => props.navigation.navigate('My friends')}
          >
            <MaterialCommunityIcons name='human-greeting-variant' size={20} color={'yellow'} />
          </TouchableOpacity>
          <Text style={{ color: 'white', textAlign: 'center' }}>Share</Text>
        </View>
        <View
          style={{
            width: oneGridWidth,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 10,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}
            // onPress={() => props.navigation.navigate('Assets', { userId: auth.data._id })}
          >
            <Ionicons name='camera' size={20} color={'yellow'} />
          </TouchableOpacity>
          <Text style={{ color: 'white', textAlign: 'center' }}>...</Text>
        </View>
        <View
          style={{
            width: oneGridWidth,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 10,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}
            // onPress={() => appMenuBottomSheetRef.current.snapToIndex(0)}
          >
            <Ionicons name='settings' size={20} color={'yellow'} />
          </TouchableOpacity>
          <Text style={{ color: 'white', textAlign: 'center' }}>Setting</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default BottomMenu;
