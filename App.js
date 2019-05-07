import React, { Component } from 'react';

import type { Employee } from './src/types';

import Map from './src/containers/Map';

type Props = {};

export default class App extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      employees: [
        {
          name: 'Alex',
          id: 'aaa',
          coordinate: { latitude: 60.17, longitude: 24.935047 }
        },
        {
          name: 'Andrei',
          id: 'bbb',
          coordinate: { latitude: 60.18, longitude: 24.935047 }
        },
        {
          name: 'Harry',
          id: 'ccc',
          coordinate: { latitude: 60.19, longitude: 24.935047 }
        },
        {
          name: 'Tuomas',
          id: 'ddd',
          coordinate: { latitude: 60.2, longitude: 24.935047 }
        }
      ]
    };
  }

  render() {
    return <Map employees={this.state.employees} />;
  }
}
