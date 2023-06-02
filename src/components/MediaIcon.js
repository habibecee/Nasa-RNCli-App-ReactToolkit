import {TouchableOpacity} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {GeneralStyles} from '../Utils/GeneralStyles';
import {useNavigation} from '@react-navigation/native';

export default function MediaIcon() {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      style={GeneralStyles.tabIcon}
      onPress={() => Navigation.navigate('NASA')}>
      <AnimatedLottieView
        source={require('../../assets/animations/astronautMoon.json')}
        autoPlay
        loop
      />
    </TouchableOpacity>
  );
}
