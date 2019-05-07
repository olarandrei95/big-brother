import React, { Component } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT, Polygon } from 'react-native-maps';
import DeviceInfo from 'react-native-device-info';

import type { Employee, Coordinate } from '../../types';
import { register, sendLocation } from '../../http';

type Props = {
	employees : Array<Employee>,
	coordinate : Coordinate
};


class Map extends Component<Props> {

	constructor(props) {
		super(props);
		this.isAndroid = Platform === 'Android';
	}

	render() {
		console.log(this.props)
		console.log('long ', this.props.coordinate.latitude)
		return (
			<MapView
				key="mymapview"
				style={{flex: 1}}
				provider={this.isAndroid ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
				region={{
					latitude: this.props.coordinate.latitude,
					longitude: this.props.coordinate.longitude,
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
        <Polygon
          key={1}
          coordinates={[
            { latitude: 60.168994, longitude: 24.934275 },
            { latitude: 60.169366, longitude: 24.935413 },
            { latitude: 60.169089, longitude: 24.935797 },
            { latitude: 60.168702, longitude: 24.934703 },
          ]}
          strokeColor="#6ca4c8"
          fillColor="rgba(135,206,250, 0.6)"
          strokeWidth={1}
        />
			</MapView>
		);
	}
}

export default Map;
