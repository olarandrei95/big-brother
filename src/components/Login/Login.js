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

  import imageLogo from "../../assets/images/logo.png";

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
        <View style={{flex: 1, paddingHorizontal: 36, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#FFFFFF'}}>
            <View>
                
            </View>
            <Image source={imageLogo} style={styles.logo} />
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.titleText}>Big Brother</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={styles.subtitleText}> It sees you when you're sleeping</Text>
            </View>
            <View style={{flex: 1}}>
              <TextInput
                style={{height: 50, fontSize: 20, borderColor: "#d3d3d3", borderWidth: 1, borderRadius: 12, marginBottom: 10}}
                placeholder="Please enter your name..."
                onChangeText={(userName) => this.setState({userName})}
              />
              <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(this.state.userName)}>
                <Text style={styles.text}>Continue</Text>
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
        backgroundColor: "#32CD32",
        marginBottom: 20,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.7)",
      },
      text: {
        color: "#FFFFFF",
        textAlign: "center",
        marginLeft: 10,
        fontSize: 20,
      },
        titleText: {
        fontSize: 36,
        fontWeight: 'bold',
        },
        subtitleText: {
            fontSize: 20,
            marginBottom: 120          
        },
        logo: {
            flex: 1,
            width: "100%",
            resizeMode: "contain",
            alignSelf: "center"
          },
  });

  export default Login;