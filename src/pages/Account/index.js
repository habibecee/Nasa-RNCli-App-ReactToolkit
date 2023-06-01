import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import Avatar from '../../components/Avatar';

export default function Account() {
  const {navigate} = useNavigation();
  return (
    <View style={[GeneralStyles.container, styles.container]}>
      <Avatar
        style={styles.Avatar}
        source={require('../../../assets/animations/helloUser.json')}
      />
      <View style={styles.Button}>
        <Text style={styles.SubText}>Do you have an account? </Text>

        <TouchableOpacity
          style={[styles.ButtonContainer, {backgroundColor: colors.dark}]}
          onPress={() => navigate('LogIn')}>
          <Text style={styles.ButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Button}>
        <Text style={styles.SubText}> Or? </Text>

        <TouchableOpacity
          style={[styles.ButtonContainer, {backgroundColor: colors.primary}]}
          onPress={() => navigate('SignIn')}>
          <Text style={styles.ButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },

  Avatar: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    marginBottom: 20,
    width: 200,
    height: 200,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },

  SubText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.dark,
    textAlign: 'center',
    marginBottom: 20,
  },

  Button: {
    marginBottom: 15,
  },

  ButtonContainer: {
    padding: 10,
    borderRadius: 10,
  },
  ButtonText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});
