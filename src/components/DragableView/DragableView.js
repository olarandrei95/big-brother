import React, { Component } from 'react';
import {
  View,
  Animated,
  Text,
  PanResponder,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';

type Props = {};

const SCREEN_HEIGHT = Dimensions.get('window').height;

class DragableView extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      touched: false
    };

    this.initialDrawerSize = SCREEN_HEIGHT * (1 - Math.abs(0.25));
    this.maxDrawerSize = SCREEN_HEIGHT * (1 - Math.abs(0.5));

    this.top = new Animated.Value(this.initialDrawerSize);

    this.pan = PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        return this.state.touched;
      },
      onPanResponderMove: (evt, gestureState) => {
        this.moveDrawerView(gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.moveFinished(gestureState);
      }
    });
  }

  moveDrawerView(gestureState) {
    const isGoingUp = gestureState.vy < 0;
    const position = gestureState.moveY - SCREEN_HEIGHT * 0.05;

    /* if (
      (!isGoingUp && position > this.initialDrawerSize) ||
      (isGoingUp && position < this.maxDrawerSize)
    ) {
      return;
    } */

    this.top.setValue(position);
  }

  moveFinished(gestureState) {
    const isGoingUp = gestureState.vy < 0;

    if (isGoingUp) {
      this.top.setValue(this.maxDrawerSize);
    } else {
      this.top.setValue(this.initialDrawerSize);
    }
  }

  render() {
    return (
      <Animated.View
        style={{ backgroundColor: '#FFF', flex: 1, top: this.top }}
        {...this.pan.panHandlers}
      >
        <TouchableWithoutFeedback
          onPressIn={() => this.setState({ touched: true })}
          onPressOut={() => this.setState({ touched: false })}
        >
          <View
            style={{
              height: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                width: 40,
                height: 10,
                borderRadius: 10,
                backgroundColor: 'gray'
              }}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={{ flex: 1 }}>{this.props.children}</View>
      </Animated.View>
    );
  }
}

export default DragableView;
