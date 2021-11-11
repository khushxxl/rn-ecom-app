import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth } from "../firebase";

const Loginscreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        navigation.replace("Home");
      }
    });
  }, []);
  const signIn = async () => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .catch((e) => alert("Network Error" + e));
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder="E-mail"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry
        />
        <Button title="Login" onPress={signIn} />
        <Text
          style={{ textAlign: "center", marginTop: 10 }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Not a user ? Register
        </Text>

        <View style={{ height: 200 }} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: 300,
  },
});
