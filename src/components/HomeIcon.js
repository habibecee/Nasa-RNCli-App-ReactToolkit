import {TouchableOpacity} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {GeneralStyles} from '../Utils/GeneralStyles';
import {useNavigation} from '@react-navigation/native';

export default function HomeIcon() {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      style={GeneralStyles.tabIcon}
      onPress={() => Navigation.navigate('Home')}>
      <AnimatedLottieView
        source={require('../../assets/animations/astronautHome.json')}
        autoPlay
        loop
      />
    </TouchableOpacity>
  );
}
