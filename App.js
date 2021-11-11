import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Cartscreen from "./screens/Cartscreen";
import Detailscreen from "./screens/Detailscreen";
import Homescreen from "./screens/Homescreen";
import Loginscreen from "./screens/Loginscreen";
import Orderscreen from "./screens/Orderscreen";
import Registerscreen from "./screens/Registerscreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Loginscreen} />
          <Stack.Screen name="Home" component={Homescreen} />
          <Stack.Screen name="Cart" component={Cartscreen} />
          <Stack.Screen name="Detail" component={Detailscreen} />
          <Stack.Screen name="Orders" component={Orderscreen} />
          <Stack.Screen name="Register" component={Registerscreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
