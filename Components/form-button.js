import React, { Component } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

export default class FormButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        style={{
          width: this.props.width,
          height: this.props.height,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: this.props.backgroundcolor,
          borderRadius: Dimensions.get("window").height,
        }}
      >
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{
            color: this.props.fontcolor,
            fontSize: Dimensions.get("window").width / 15,
            fontWeight: "bold",
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    );
  }
}
