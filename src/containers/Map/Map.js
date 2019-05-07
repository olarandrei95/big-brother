import React, { Component } from 'react';
import { Platform, View, FlatList } from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Polygon
} from 'react-native-maps';

import type { Employee, Coordinate } from '../../types';

import DragableView from '../../components/DragableView';
import EmployeeItem from '../../components/EmployeeItem';

type Props = {
  employees: Array<Employee>,
  coordinate: Coordinate
};

class Map extends Component<Props> {
  constructor(props) {
    super(props);

    this.isAndroid = Platform.OS === 'android';

    this.polygon = [
      { latitude: 60.168994, longitude: 24.934275 },
      { latitude: 60.169366, longitude: 24.935413 },
      { latitude: 60.169089, longitude: 24.935797 },
      { latitude: 60.168702, longitude: 24.934703 },
      { latitude: 60.168994, longitude: 24.934275 }
    ];

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ item }) {
    return <EmployeeItem employee={item} polygon={this.polygon} />;
  }

  render() {
    console.log(this.props.employees);
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
            coordinates={this.polygon}
            strokeColor="#6ca4c8"
            fillColor="rgba(135,206,250, 0.6)"
            strokeWidth={1}
          />
        </MapView>

        <DragableView>
          <FlatList
            data={this.props.employees}
            renderItem={this.renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </DragableView>
      </View>
    );
  }
}

export default Map;
