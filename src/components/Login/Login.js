import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from 'react-native';

import imageLogo from '../../assets/images/logo.png';

type Props = {
  onPress: Function
};

class Login extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      userName: ''
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingBottom: 24,
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF'
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={imageLogo}
            style={{
              height: 150,
              resizeMode: 'contain',
              alignSelf: 'center'
            }}
          />

          <Text
            style={{ fontSize: 36, fontWeight: 'bold', textAlign: 'center' }}
          >
            Big Brother
          </Text>

          <Text style={{ fontSize: 20, marginTop: 10, textAlign: 'center' }}>
            It sees you when you're sleeping
          </Text>
        </View>

        <View>
          <TextInput
            style={{
              height: 50,
              fontSize: 20,
              paddingHorizontal: 10,
              borderColor: '#d3d3d3',
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 10
            }}
            placeholder="Please enter your name..."
            onChangeText={userName => this.setState({ userName })}
          />
          <TouchableOpacity
            style={{
              height: 50,
              justifyContent: 'center',
              backgroundColor: '#32CD32',
              borderRadius: 12,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: 'rgba(255,255,255,0.7)'
            }}
            onPress={() => this.props.onPress(this.state.userName)}
          >
            <Text
              style={{
                color: '#FFFFFF',
                textAlign: 'center',
                marginLeft: 10,
                fontSize: 20
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;
