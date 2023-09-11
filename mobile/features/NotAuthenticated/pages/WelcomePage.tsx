import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';

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
        }}
      >
        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Login')}
        style={{
          paddingLeft: 10,
          paddingRight: 20,
          backgroundColor: 'rgb(80,80,80)',
          borderRadius: 10,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Signup</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomePage;
