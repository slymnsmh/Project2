import { StyleSheet, View, ViewBase } from "react-native";
import HomeScreen from "./Screens/HomeScreen";

export default function App() {
  return <HomeScreen></HomeScreen>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
