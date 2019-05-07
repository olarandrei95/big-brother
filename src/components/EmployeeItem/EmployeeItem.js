import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import type { Employee } from '../../types';

type Props = {
  employee: Employee,
  polygon: Array<*>,
  onEmployeeCheck: Function
};

class EmployeeItem extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: 'orange'
    };
  }

  pointInPolygon(p, polygon) {
    const point = [p.latitude, p.longitude];
    const vs = Object.keys(polygon).map(key => {
      return [polygon[key].latitude, polygon[key].longitude];
    });

    var x = point[0],
      y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0],
        yi = vs[i][1];
      var xj = vs[j][0],
        yj = vs[j][1];

      var intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  }

  getBackgroudColorBasedOnLocation() {
    if (
      this.pointInPolygon(this.props.employee.coordinate, this.props.polygon)
    ) {
      return 'green';
    }

    return 'red';
  }

  render() {
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 16, paddingVertical: 10 }}
        onPress={() =>
          this.props.onEmployeeCheck(this.props.employee.coordinate)
        }
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              height: 14,
              width: 14,
              borderRadius: 7,
              backgroundColor: this.getBackgroudColorBasedOnLocation()
            }}
          />
          <Text style={{ marginLeft: 10, fontSize: 14, color: 'black' }}>
            {this.props.employee.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default EmployeeItem;
