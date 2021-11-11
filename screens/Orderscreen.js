import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Orderscreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  });
  return (
    <View style={styles.constainer}>
      <Text>Order Placed Successfully </Text>
      <Text style={{ marginTop: 10 }}>Thank you for Shopping💜</Text>
    </View>
  );
};

export default Orderscreen;

const styles = StyleSheet.create({
  constainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
