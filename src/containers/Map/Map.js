import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Polygon
} from 'react-native-maps';

import type { Employee, Coordinate } from '../../types';

import DragableView from '../../components/DragableView';

type Props = {
  employees: Array<Employee>,
  coordinate: Coordinate
};

class Map extends Component<Props> {
  constructor(props) {
    super(props);
    this.isAndroid = Platform === 'Android';
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          key="mymapview"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
          }}
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
              { latitude: 60.168702, longitude: 24.934703 }
            ]}
            strokeColor="#6ca4c8"
            fillColor="rgba(135,206,250, 0.6)"
            strokeWidth={1}
          />
        </MapView>

        <DragableView />
      </View>
    );
  }
}

export default Map;
