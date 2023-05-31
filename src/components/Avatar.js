import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native';

export default function Avatar({ style, source, onPress }) {
	return (
		<TouchableOpacity
			style={style}
			onPress={onPress}>
			<AnimatedLottieView
				source={source}
				autoPlay
			/>
		</TouchableOpacity>
	);
}
