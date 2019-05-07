import React, { Component } from 'react';

import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet
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
              <Button title="Continue" style={styles.button} onPress={() => this.props.onPress(this.state.userName)}/>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: 'blue',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 12,
      color: 'white',
      fontSize: 32,
      fontWeight: 'bold',
      overflow: 'hidden',
      padding: 12,
      textAlign:'center',
      height: 50
    },
    titleText: {
      fontSize: 36,
      fontWeight: 'bold',
      marginVertical: 120
    },
  });

  export default Login;