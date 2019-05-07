/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

type Props = {};

export default class App extends Component<Props> {
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
        message: 'Big Brother wants to know your loccation',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK'
      }
    )
      .then(() => this.onLocationGranted())
      .catch(err => console.log(err));
  }

  onLocationGranted() {
    console.log('here');

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
    console.log(this.state);
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
		  <Marker
			coordinate={{
				latitude: this.state.latitude,
				longitude: this.state.longitude,
			}}
		/>
	  </MapView>
    );
  }
}
