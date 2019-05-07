import React, { Component } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import DeviceInfo from 'react-native-device-info';

import type { Employee } from '../../types';

type Props = {
	employees : Array<Employee>
};

type State = {
	latitude : 0,
	longitude : 0
};

class Map extends Component<Props, State> {

	constructor(props) {
		super(props);
		this.isAndroid = Platform === 'Android';

		this.state = {
			latitude: 0,
			longitude: 0
		};
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
	}

	onLocationGranted() {
		Geolocation.getCurrentPosition(
			position => {
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
			},
			error => {
				console.log(error.code, error.message);
			},
			{enableHighAccuracy: true, timeout: 30000, maximumAge: 10000}
		);
	}

	render() {
		return (
			<MapView
				key="mymapview"
				style={{flex: 1}}
				provider={this.isAndroid ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
				region={{
					latitude: this.state.latitude,
					longitude: this.state.longitude,
					latitudeDelta: 0.04,
					longitudeDelta: 0.05
				}}
			>
				{this.props.employees.map(employee => (
					<Marker
						key={employee.id}
						coordinate={{
							latitude: employee.coordinate.latitude,
							longitude: employee.coordinate.longitude
						}}
						title={employee.name}
					/>
				))}
			</MapView>
		);
	}
}

export default Map;
