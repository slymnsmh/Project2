import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Keyboard,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormButton from "../Components/form-button";
import FormInput from "../Components/form-input";
import DatePicker from "@react-native-community/datetimepicker";
import FormInputClickable from "../Components/form-input-clickable";
import Moment from "moment";

const inputWidth = Dimensions.get("window").width * 0.9;
const inputHeight = Dimensions.get("window").height * 0.06;
const today = new Date();
let datePicked = null;

const cities = [
  { id: 1, title: "Ankara" },
  { id: 2, title: "Eskişehir" },
  { id: 3, title: "İstanbul" },
];

const genders = [
  { id: 1, title: "Male" },
  { id: 2, title: "Female" },
  { id: 3, title: "None" },
];

const vaccine_types = [
  { id: 1, title: "Type 1" },
  { id: 2, title: "Type 2" },
  { id: 3, title: "Type 3" },
];

const yes_no = [
  { id: 1, title: "Yes" },
  { id: 2, title: "No" },
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
      showVaccineTypeModal: false,
      showSideEffectModal: false,
      showDatePicker: false,
      allDone: false,
      showCityPicker: false,
      showGenderPicker: false,
      showPCRPositiveModal: false,
    };

    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  parseDate(input) {
    var str = JSON.stringify(input.nativeEvent.timestamp).substring(1, 11);
    const splitArr = str.split("-");
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(splitArr[0], splitArr[1] - 1, splitArr[2]); // months are 0-based
  }

  render() {
    Moment.locale("en");
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
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <View
              blurRadius={5}
              style={{
                width: "100%",
                height: "85%",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "90%",
                  height: "10%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={{
                    paddingHorizontal: "5%",
                    fontSize: Dimensions.get("window").width / 10,
                  }}
                >
                  Covid-19 Vaccine Survey
                </Text>
              </View>
              <View
                style={{
                  width: "90%",
                  height: "90%",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <FormInput
                  width={inputWidth}
                  height={inputHeight}
                  placeholder="Name"
                  value={this.state.name}
                  onchange={(value) => {
                    this._isMounted && this.setState({ name: value });
                  }}
                />
                <FormInput
                  width={inputWidth}
                  height={inputHeight}
                  placeholder="Surname"
                  value={this.state.surname}
                  onchange={(value) => {
                    this._isMounted && this.setState({ surname: value });
                  }}
                />
                <FormInputClickable
                  width={inputWidth}
                  height={inputHeight}
                  placeholder="Birth Date"
                  onpress={() => {
                    this._isMounted && this.setState({ showDatePicker: true });
                  }}
                  value={
                    Moment(this.state.birth_date).format("D MM Y") !=
                    "Invalid date"
                      ? Moment(this.state.birth_date).format("DD/MM/Y")
                      : ""
                  }
                />
                <FormInputClickable
                  width={inputWidth}
                  height={inputHeight}
                  placeholder="City"
                  onpress={() => {
                    this._isMounted && this.setState({ showCityPicker: true });
                  }}
                  value={this.state.city.title}
                />
                <FormInputClickable
                  width={inputWidth}
                  height={inputHeight}
                  placeholder="Gender"
                  onpress={() => {
                    this._isMounted &&
                      this.setState({ showGenderPicker: true });
                  }}
                  value={this.state.gender.title}
                />
                <FormInputClickable
                  width={inputWidth}
                  height={inputHeight}
                  placeholder="Vaccine Type"
                  onpress={() => {
                    this._isMounted &&
                      this.setState({ showVaccineTypeModal: true });
                  }}
                  value={this.state.vaccine_type.title}
                />
                <FormInputClickable
                  width={inputWidth}
                  height={inputHeight}
                  placeholder="Side Effect"
                  onpress={() => {
                    this._isMounted &&
                      this.setState({ showSideEffectModal: true });
                  }}
                  value={this.state.side_effect.title}
                />
                <FormInputClickable
                  width={inputWidth}
                  height={inputHeight}
                  placeholder="PCR Positive"
                  onpress={() => {
                    this._isMounted &&
                      this.setState({ showPCRPositiveModal: true });
                  }}
                  value={this.state.pcr_positive.title}
                />
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: "15%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <FormButton
                width={inputWidth * 0.7}
                height={inputHeight * 1.1}
                disabled={this.state.allDone ? false : true}
                backgroundcolor={
                  this.state.allDone ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.2)"
                }
                fontcolor={this.state.allDone ? "white" : "rgba(0,0,0,0.4)"}
              />
            </View>

            {Platform.OS === "ios" ? (
              <Modal
                style={{ width: "100%", height: "100%" }}
                visible={this.state.showDatePicker}
                animationType="slide"
                transparent={true}
              >
                <SafeAreaView
                  style={{
                    padding: "5%",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderTopLeftRadius: Dimensions.get("screen").width / 15,
                    borderTopRightRadius: Dimensions.get("screen").width / 15,
                    left: "0%",
                    right: "0%",
                    bottom: "0%",
                    alignItems: "center",
                    position: "absolute",
                  }}
                >
                  <View
                    style={{
                      paddingTop: "5%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      paddingHorizontal: "20%",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this._isMounted &&
                          this.setState({
                            showDatePicker: false,
                          });
                      }}
                      style={{
                        width: "40%",
                        paddingBottom: "2%",
                        borderBottomWidth: 0.3,
                        borderBottomColor: "black",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: Dimensions.get("window").width / 20,
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        İptal
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        if (datePicked != null) {
                          this._isMounted &&
                            this.setState({
                              birth_date: datePicked,
                              showDatePicker: false,
                            });
                        } else {
                          this._isMounted &&
                            this.setState({
                              showDatePicker: false,
                            });
                        }
                      }}
                      style={{
                        width: "40%",
                        paddingBottom: "2%",
                        borderBottomWidth: 0.3,
                        borderBottomColor: "black",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: Dimensions.get("window").width / 20,
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        Tamam
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <DatePicker
                    display="spinner"
                    textColor="black"
                    style={{ width: "100%" }}
                    value={
                      this.state.birth_date ? this.state.birth_date : today
                    }
                    mode="date"
                    locale="tr-TR"
                    minimumDate={today}
                    onChange={(event, date) => {
                      datePicked = date;
                    }}
                  />
                </SafeAreaView>
              </Modal>
            ) : this.state.showDatePicker ? (
              <DatePicker
                textColor="white"
                style={{ width: "100%" }}
                value={this.state.birth_date ? this.state.birth_date : today}
                mode="date"
                locale="tr-TR"
                minimumDate={today}
                onChange={(date) => {
                  this._isMounted &&
                    this.setState({
                      birth_date: date,
                      showDatePicker: !this.state.showDatePicker,
                    });
                }}
              />
            ) : null}

            <Modal
              style={{ width: "100%", height: "100%" }}
              visible={this.state.showCityPicker}
              animationType="slide"
              transparent={true}
            >
              <SafeAreaView
                style={{
                  padding: "5%",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  borderTopLeftRadius: Dimensions.get("screen").width / 15,
                  borderTopRightRadius: Dimensions.get("screen").width / 15,
                  left: "0%",
                  right: "0%",
                  bottom: "0%",
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
                      Choose your city
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: "70%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
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
                        data={cities}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() =>
                              this._isMounted &&
                              this.setState({
                                showCityPicker: false,
                                city: item,
                              })
                            }
                            style={{
                              height: Dimensions.get("window").height / 25,
                            }}
                          >
                            <Text
                              style={{
                                color: "black",
                                fontSize: Dimensions.get("window").width / 20,
                              }}
                            >
                              {item.title}
                            </Text>
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

            <Modal
              style={{ width: "100%", height: "100%" }}
              visible={this.state.showGenderPicker}
              animationType="slide"
              transparent={true}
            >
              <SafeAreaView
                style={{
                  padding: "5%",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  borderTopLeftRadius: Dimensions.get("screen").width / 15,
                  borderTopRightRadius: Dimensions.get("screen").width / 15,
                  left: "0%",
                  right: "0%",
                  bottom: "0%",
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
                      Choose your gender
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: "70%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
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
                        data={genders}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() =>
                              this._isMounted &&
                              this.setState({
                                showGenderPicker: false,
                                gender: item,
                              })
                            }
                            style={{
                              height: Dimensions.get("window").height / 25,
                            }}
                          >
                            <Text
                              style={{
                                color: "black",
                                fontSize: Dimensions.get("window").width / 20,
                              }}
                            >
                              {item.title}
                            </Text>
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

            <Modal
              style={{ width: "100%", height: "100%" }}
              visible={this.state.showVaccineTypeModal}
              animationType="slide"
              transparent={true}
            >
              <SafeAreaView
                style={{
                  padding: "5%",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  borderTopLeftRadius: Dimensions.get("screen").width / 15,
                  borderTopRightRadius: Dimensions.get("screen").width / 15,
                  left: "0%",
                  right: "0%",
                  bottom: "0%",
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
                      height: "70%",
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
                            onPress={() =>
                              this._isMounted &&
                              this.setState({
                                showVaccineTypeModal: false,
                                vaccine_type: item,
                              })
                            }
                            style={{
                              height: Dimensions.get("window").height / 25,
                            }}
                          >
                            <Text
                              style={{
                                color: "black",
                                fontSize: Dimensions.get("window").width / 20,
                              }}
                            >
                              {item.title}
                            </Text>
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

            <Modal
              style={{ width: "100%", height: "100%" }}
              visible={this.state.showSideEffectModal}
              animationType="slide"
              transparent={true}
            >
              <SafeAreaView
                style={{
                  padding: "5%",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  borderTopLeftRadius: Dimensions.get("screen").width / 15,
                  borderTopRightRadius: Dimensions.get("screen").width / 15,
                  left: "0%",
                  right: "0%",
                  bottom: "0%",
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
                      Were there any side effects?
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: "70%",
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
                        data={yes_no}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() =>
                              this._isMounted &&
                              this.setState({
                                showSideEffectModal: false,
                                side_effect: item,
                              })
                            }
                            style={{
                              height: Dimensions.get("window").height / 25,
                            }}
                          >
                            <Text
                              style={{
                                color: "black",
                                fontSize: Dimensions.get("window").width / 20,
                              }}
                            >
                              {item.title}
                            </Text>
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

            <Modal
              style={{ width: "100%", height: "100%" }}
              visible={this.state.showPCRPositiveModal}
              animationType="slide"
              transparent={true}
            >
              <SafeAreaView
                style={{
                  padding: "5%",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  borderTopLeftRadius: Dimensions.get("screen").width / 15,
                  borderTopRightRadius: Dimensions.get("screen").width / 15,
                  left: "0%",
                  right: "0%",
                  bottom: "0%",
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
                      numberOfLines={2}
                      style={{
                        fontSize: Dimensions.get("window").width / 15,
                        fontWeight: "bold",
                      }}
                    >
                      Do you have any positive PCR result?
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: "70%",
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
                        data={yes_no}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() =>
                              this._isMounted &&
                              this.setState({
                                showPCRPositiveModal: false,
                                pcr_positive: item,
                              })
                            }
                            style={{
                              height: Dimensions.get("window").height / 25,
                            }}
                          >
                            <Text
                              style={{
                                color: "black",
                                fontSize: Dimensions.get("window").width / 20,
                              }}
                            >
                              {item.title}
                            </Text>
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

            {this.state.showDatePicker ||
            this.state.showCityPicker ||
            this.state.showVaccineTypeModal ||
            this.state.showSideEffectModal ||
            this.state.showGenderPicker ||
            this.state.showPCRPositiveModal ? (
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
