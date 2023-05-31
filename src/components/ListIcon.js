import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native';
import { GeneralStyles } from '../Utils/GeneralStyles';
import { useNavigation } from '@react-navigation/native';

export default function ListIcon() {
	const Navigation = useNavigation();
	return (
		<TouchableOpacity
			style={GeneralStyles.tabIcon}
			onPress={() => Navigation.navigate('Categories')}>
			<AnimatedLottieView
				source={require('../../assets/animations/astronautTelescope.json')}
				autoPlay
				loop
			/>
		</TouchableOpacity>
	);
}
