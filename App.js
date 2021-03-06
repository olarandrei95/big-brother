import React, { Component } from 'react';

import type { Employee } from './src/types';

import Map from './src/containers/Map';
import { register, sendLocation, getLatestPositions } from './src/http';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Login from './src/components/Login';

type Props = {};

type State = {
  employees: Array<Employee>,
  latitude: 0,
  longitude: 0,
  userRegistered: boolean
};

export default class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.isAndroid = Platform.OS === 'android';

    this.state = {
      latitude: 0,
      longitude: 0,
      employees: [],
      userRegistered: false
    };

    this.tryToGetLocation = this.tryToGetLocation.bind(this);
    this.getEmployees = this.getEmployees.bind(this);
  }

  componentDidMount() {
    this.tryToGetLocation();
    this.getEmployees();
    setInterval(this.tryToGetLocation, 15000);
    setInterval(this.getEmployees, 5000);
  }

  tryToGetLocation() {
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

  getEmployees() {
    getLatestPositions().then(response => {
      const employees = response.users.map(user => ({
        id: user.userID,
        name: user.name,
        coordinate: {
          latitude: Number(user.latitude),
          longitude: Number(user.longitude)
        },
        timestamp: user.timestamp
      }));
      const sortedEmployees = employees.sort(
        (a, b) => b.timestamp > a.timestamp
      );
      this.setState({ employees: sortedEmployees });
      console.log('fetch employees ok: ', new Date());
    });
  }

  onLocationGranted() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        if (this.state.userRegistered) {
          sendLocation(position.coords.latitude, position.coords.longitude);
        }
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
    );
  }

  loginUser = userName => {
    console.log('Login user');
    this.setState({
      userRegistered: true
    });
    register(userName);
  };

  render() {
    return !this.state.userRegistered ? (
      <Login onPress={this.loginUser} />
    ) : (
      <Map
        employees={this.state.employees}
        coordinate={{
          latitude: 60.1691224,
          longitude: 24.935047
        }}
      />
    );
  }
}
