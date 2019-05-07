import React, { Component } from 'react';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import type { Employee } from '../../types';

type Props = {
  employees: Array<Employee>
};

type State = {
  latitude: 0,
  longitude: 0
};

type Coordinate = {
  latitude: number,
  longitude: number
};

class Map extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0
    };
  }

  componentDidMount() {
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
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
    );
  }

  render() {
    return (
      <MapView
        key="mymapview"
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
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
