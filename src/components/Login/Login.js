import React, { Component } from 'react';

import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity
  } from 'react-native';

type Props = {
    onPress: Function
};

class Login extends Component<Props> {
    constructor(props) {
        super(props);
    
        this.state = {
            userName: '',
        };

    }

    render() {
        return (
        <View style={{flex: 1, marginHorizontal: 36, flexDirection: 'column', justifyContent: 'center'}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.titleText}>Big Brother App</Text>
            </View>
            <View style={{flex: 1}}>
              <TextInput
                style={{height: 60, fontSize: 20}}
                placeholder="Please enter your name..."
                onChangeText={(userName) => this.setState({userName})}
              />
              <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(this.state.userName)}>
                <Text styles={styles.text}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "space-between"
      },
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#428AF8",
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.7)",
      },
      text: {
        color: "#FFFFFF",
        textAlign: "center",
        height: 20
      },
        titleText: {
        fontSize: 36,
        fontWeight: 'bold',
        marginVertical: 120
        }
  });

  export default Login;