import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

export default function Loading() {
	return (
		<SafeAreaView
			style={{
				flex: 1,

				alignItems: 'center',
			}}>
			<View>
				<AnimatedLottieView
					style={{ width: '100%' }}
					source={require('../../assets/animations/rocket.json')}
					autoPlay
					loop
				/>
			</View>
		</SafeAreaView>
	);
}
