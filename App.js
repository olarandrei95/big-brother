import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import DeviceInfo from 'react-native-device-info';
import { PROVIDER_GOOGLE } from 'react-native-maps';

type Props = {};
type State = {
    employees: Array<Employee>,
    latitude: 0,
    longitude: 0
}

type Coordinate = {
    latitude: number,
    longitude: number
}


type Employee = {
    name: string,
    id: string,
    coordinate: Coordinate
}

export default class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
        employees: [
            {
                name: 'Alex',
                id: 'aaa',
                coordinate: {latitude: 60.17, longitude: 24.935047}
            },
            {
                name: 'Andrei',
                id: 'bbb',
                coordinate: {latitude: 60.18, longitude: 24.935047}
            },
            {
                name: 'Harry',
                id: 'ccc',
                coordinate: {latitude: 60.19, longitude: 24.935047}
            },
            {
                name: 'Tuomas',
                id: 'ddd',
                coordinate: {latitude: 60.20, longitude: 24.935047}
            }
            ],
      latitude: 0,
      longitude: 0
    };
  }

  componentDidMount() {
    const hasLocationPermission = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Big Brother wants to know your loccation',
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
    const uniqueId = DeviceInfo.getUniqueID();
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
          {this.state.employees.map(employee => (
              <Marker
                  coordinate={{
                      latitude: employee.coordinate.latitude,
                      longitude: employee.coordinate.longitude
                  }}
              />
          ))}
      </MapView>
    );
  }
}
