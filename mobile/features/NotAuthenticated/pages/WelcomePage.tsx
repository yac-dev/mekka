import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const WelcomePage = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 50, paddingBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            // marginBottom: 10,
          }}
        >
          Welcome to
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FastImage source={require('../../../assets/mekka-logo.png')} style={{ width: 35, height: 35 }} />
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>ekka</Text>
        </View>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          To get started, please login or signup at first.
        </Text>
      </View>
      <Text>Welcome to Mekka. Please signup or login to proceed.</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Login')}
        style={{
          paddingLeft: 10,
          paddingRight: 20,
          paddingTop: 20,
          paddingBottom: 20,
          backgroundColor: 'rgb(80,80,80)',
          borderRadius: 10,
          marginBottom: 30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name='login' color='white' size={25} style={{ marginRight: 20 }} />
          <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Login</Text>
        </View>
        <MaterialCommunityIcons name='chevron-right' size={25} color='white' />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Signup')}
        style={{
          paddingLeft: 10,
          paddingRight: 20,
          backgroundColor: 'rgb(80,80,80)',
          borderRadius: 10,
          paddingTop: 20,
          paddingBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name='create' color='white' size={25} style={{ marginRight: 20 }} />
          <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Signup</Text>
        </View>
        <MaterialCommunityIcons name='chevron-right' size={25} color='white' />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomePage;
