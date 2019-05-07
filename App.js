import React, { Component } from 'react';

import type { Employee } from './src/types';

import Map from './src/containers/Map';
import { register, sendLocation, getLatestPositions } from './src/http';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

type Props = {};

type State = {
	employees : Array<Employee>,
	latitude : 0,
	longitude : 0
};

export default class App extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.isAndroid = Platform === 'Android';

		this.state = {
			latitude: 0,
			longitude: 0
		};

		this.state = {
			employees: []
		};

		register();
}

componentDidMount() {
	if (this.isAndroid) {
		const hasLocationPermission = PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
				title: 'Location Permission',
				message: 'Big Brother wants to know your location',
				buttonNegative: 'Cancel',
				buttonPositive: 'OK'
			}
		)
			.then(() => this.onLocationGranted())
			.catch(err => console.log(err));
	} else {
		this.onLocationGranted();
	}

	getLatestPositions()
		.then(resones => {

			const employees = resones.users.map(user => (
				{
					name: user.name,
					coordinate: {
						latitude: Number(user.latitude),
						longitude: Number(user.longitude)
					}
				}
			));

			this.setState({ employees })
		});
}

onLocationGranted()
{
	Geolocation.getCurrentPosition(
		position => {
			this.setState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
			sendLocation(position.coords.longitude, position.coords.latitude);
		},
		error => {
			console.log(error.code, error.message);
		},
		{enableHighAccuracy: true, timeout: 30000, maximumAge: 10000}
	);
}

render()
{
	return (
		<Map
			employees={this.state.employees}
			coordinate={{
				latitude: this.state.latitude || 0,
				longitude: this.state.longitude || 0
			}}
		/>
	);
}
}
