import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Detailscreen = ({ navigation, route }) => {
  const { title, image, price, desc, id } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerBackTitle: "Home",
    });
  });

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: `${image}` }}
          style={{ width: 400, height: 400 }}
        />
        <Text style={styles.productText}>{title + " 💜"}</Text>
        <Text style={styles.productText}>{"₹" + price}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </View>
  );
};

export default Detailscreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    flex: 1,
  },
  productText: {
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 10,
  },
  desc: {
    fontWeight: "600",
    padding: 10,
    marginTop: 10,
    fontSize: 17,
    marginLeft: 10,
  },
});
