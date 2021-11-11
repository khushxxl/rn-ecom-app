import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { auth } from "../firebase";

import {
  removeFromBasket,
  selectItems,
  selectTotal,
} from "../slices/basketSlice";
import { useDispatch } from "react-redux";

const Cartscreen = ({ navigation }) => {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const total = useSelector(selectTotal);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back",
    });
  }, []);
  if (items.length != 0) {
    return (
      <ScrollView style={{ flex: 1 }}>
        {items.map(({ image, title, price, id }) => {
          const removeFromCart = () => {
            dispatch(removeFromBasket({ id }));
          };
          return (
            <View key={id} style={styles.productContianer}>
              <View style={{ marginTop: 30 }}>
                <TouchableOpacity>
                  <Image
                    source={{ uri: `${image}` }}
                    style={{ height: 100, width: 100 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "flex-start" }}>
                <Text style={styles.productText}>{title}</Text>
                <Text
                  style={[
                    styles.productText,
                    { fontWeight: "600", marginTop: 7 },
                  ]}
                >
                  {"₹" + price}
                </Text>
                <View style={{ marginTop: 10 }}>
                  <Button title="Remove From Cart" onPress={removeFromCart} />
                </View>
              </View>
            </View>
          );
        })}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 400,
            padding: 22,
            bottom: 0,
            backgroundColor: "#fff",

            marginTop: 100,
          }}
        >
          <Text>Total : {items.length}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Text>₹{total}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            try {
              db.collection("orders")
                .add({
                  products: [{ items }],
                  email: auth.currentUser.email,
                  name: auth.currentUser.displayName,
                })
                .then(() => {
                  setTimeout(() => {
                    navigation.replace("Orders");
                  }, 1000);
                })
                .catch((e) => alert(e));
            } catch (error) {
              (error) => alert(error);
            }
          }}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            padding: 20,
            marginRight: 20,
            marginLeft: 20,
            marginTop: 10,
            borderRadius: 20,
          }}
        >
          <Text style={[styles.productText, { color: "white" }]}>Buy Now</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  } else {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text> No items in Cart</Text>
      </View>
    );
  }
};

export default Cartscreen;

const styles = StyleSheet.create({
  topText: {
    fontWeight: "600",
    fontSize: 20,
    marginTop: 14,
    marginLeft: 10,
    flexDirection: "row",
  },
  productContianer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
  },
  productText: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
  },
});
