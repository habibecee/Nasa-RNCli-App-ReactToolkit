import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {TouchableOpacity} from 'react-native';
import {GeneralStyles} from '../Utils/GeneralStyles';
import {useNavigation} from '@react-navigation/native';

export default function UserIcon() {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      style={GeneralStyles.tabIcon}
      onPress={() => Navigation.navigate('Account')}>
      <AnimatedLottieView
        source={require('../../assets/animations/spaceman.json')}
        autoPlay
        loop
      />
    </TouchableOpacity>
  );
}
