import React, { Component } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";

export default class FormButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          width: this.props.width,
          height: this.props.height,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.8)",
          borderRadius: Dimensions.get("window").height,
        }}
      ></TouchableOpacity>
    );
  }
}
