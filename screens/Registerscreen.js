import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth } from "../firebase";
import { db } from "../firebase";

const Registerscreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  useEffect(() => {
    auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
      authUser.user.updateProfile({
        displayName: name,
      });

      db.collection("users").add({
        name: name,
        email: email,
        number: phoneNumber,
      });
    });
  }, []);
  const signIn = async () => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .catch((e) => alert("Network Error"));
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <Input
          placeholder="Enter Phone Number"
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
          keyboardType="number-pad"
          textContentType="telephoneNumber"
        />
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
        <Button title="Register" onPress={signIn} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Registerscreen;

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
