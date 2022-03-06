import React, { Component } from "react";
import { Dimensions, TextInput, View } from "react-native";

export default class FormInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        onPress={() => {
          Keyboard.dismiss();
        }}
        activeOpacity={5}
        style={{
          width: this.props.width,
          height: this.props.height,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.8)",
          borderRadius: Dimensions.get("window").height,
          paddingHorizontal: "5%",
        }}
      >
        <TextInput
          placeholder={this.props.placeholder}
          placeholderTextColor="white"
          style={{ width: "100%", color: "white" }}
          onChangeText={this.props.onchange}
        ></TextInput>
      </View>
    );
  }
}
