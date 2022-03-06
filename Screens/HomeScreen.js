import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Keyboard,
  Modal,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormButton from "../Components/form-button";
import FormInput from "../Components/form-input";

const inputWidth = Dimensions.get("window").width * 0.9;
const inputHeight = Dimensions.get("window").height * 0.06;

const vaccine_types = [
  { id: 1, title: "Type 1" },
  { id: 2, title: "Type 2" },
  { id: 3, title: "Type 3" },
];

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      birth_date: "",
      city: "",
      gender: "",
      vaccine_type: "",
      side_effect: "",
      pcr_positive: false,
      showSideEffectModal: true,
    };

    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
        }}
        activeOpacity={5}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ImageBackground
          source={require("../assets/vaccine_bg.jpg")}
          style={{ width: "100%", height: "100%" }}
          blurRadius={5}
          resizeMode="cover"
        >
          <SafeAreaView
            style={{
              width: "100%",
              height: "100%",
              paddingTop:
                Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              blurRadius={5}
              style={{
                width: "100%",
                height: "90%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <FormInput
                width={inputWidth}
                height={inputHeight}
                placeholder="Name"
                onchange={(value) => {
                  this.setState({ name: value });
                }}
              ></FormInput>
              <FormInput
                width={inputWidth}
                height={inputHeight}
                placeholder="Surname"
                onchange={(value) => {
                  this.setState({ surname: value });
                }}
              ></FormInput>
              <FormInput
                width={inputWidth}
                height={inputHeight}
                placeholder="Birth Date"
                onchange={(value) => {
                  this.setState({ birth_date: value });
                }}
              ></FormInput>
              <FormInput
                width={inputWidth}
                height={inputHeight}
                placeholder="City"
                onchange={(value) => {
                  this.setState({ city: value });
                }}
              ></FormInput>
              <FormInput
                width={inputWidth}
                height={inputHeight}
                placeholder="Gender"
                onchange={(value) => {
                  this.setState({ gender: value });
                }}
              ></FormInput>
              <FormInput
                width={inputWidth}
                height={inputHeight}
                placeholder="Vaccine Type"
                onchange={(value) => {
                  this.setState({ vaccine_type: value });
                }}
              ></FormInput>
              <FormInput
                width={inputWidth}
                height={inputHeight}
                placeholder="Side Effect"
                onchange={(value) => {
                  this.setState({ side_effect: value });
                }}
              ></FormInput>
              <FormInput
                width={inputWidth}
                height={inputHeight}
                placeholder="PCR Positive"
                onchange={(value) => {
                  this.setState({ pcr_positive: value });
                }}
              ></FormInput>
            </View>
            <View
              style={{
                width: "100%",
                height: "10%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <FormButton></FormButton>
            </View>
            <Modal
              style={{ width: "100%" }}
              visible={this.state.showSideEffectModal}
              animationType="slide"
              transparent={true}
            >
              <SafeAreaView
                style={{
                  backgroundColor: "white",
                  borderRadius: Dimensions.get("screen").width / 15,
                  left: "5%",
                  right: "5%",
                  bottom: "30%",
                  top: "30%",
                  alignItems: "center",
                  position: "absolute",
                }}
              >
                <View
                  style={{
                    padding: "3%",
                    width: "100%",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: "20%",
                      alignItems: "center",
                      borderBottomWidth: 0.3,
                      borderBottomColor: "black",
                    }}
                  >
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      style={{
                        fontSize: Dimensions.get("window").width / 20,
                        fontWeight: "bold",
                      }}
                    >
                      Choose your vaccine type
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: "60%",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "95%",
                        height: "100%",
                      }}
                    >
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={vaccine_types}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={{
                              height: Dimensions.get("window").height / 25,
                            }}
                          >
                            <Text style={{ color: "black" }}>{item.title}</Text>
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                      />
                    </View>
                    <View
                      style={{
                        width: "5%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: Dimensions.get("window").width / 20,
                        }}
                      >
                        ^
                      </Text>
                      <Text
                        style={{
                          fontSize: Dimensions.get("window").width / 20,
                          transform: [{ rotate: "180deg" }],
                        }}
                      >
                        ^
                      </Text>
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </Modal>
            {this.state.showSideEffectModal ? (
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  position: "absolute",
                  left: "0%",
                  right: "0%",
                  top: "0%",
                  bottom: "0%",
                }}
              ></View>
            ) : null}
          </SafeAreaView>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
