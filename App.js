/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import DeviceInfo from 'react-native-device-info';
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu'
});

type Props = {};
export default class App extends Component<Props> {
	render() {
		const uniqueId = DeviceInfo.getUniqueID();

		return (
			<View style={styles.container}>
				<MapView
					provider={PROVIDER_GOOGLE}
					initialRegion={{
						latitude: 60.169346,
						longitude: 24.934744,
						latitudeDelta: 0.04,
						longitudeDelta: 0.05
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});
