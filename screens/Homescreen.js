import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Avatar } from "react-native-elements";
// import { products } from "../data";
import Ionicons from "react-native-vector-icons/Ionicons";
import Product from "../component/Product";
import { db } from "../firebase";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

const Homescreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const items = useSelector(selectItems);

  useEffect(async () => {
    const unsub = db.collection("products").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsub;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Shop Up",
      headerRight: () => (
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cart");
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="cart" color="black" size={28} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <View>
          <TouchableOpacity
            onPress={() => {
              auth.signOut().then(() => {
                navigation.replace("Login");
              });
            }}
          >
            <Ionicons rounded name="person" size={24} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <Text style={[styles.topText, { marginBottom: 10 }]}>
        Recommended For You
      </Text>

      {products.map(({ data: { title, image, price, id, desc } }) => {
        return (
          <Product
            key={id}
            title={title}
            image={image}
            price={price}
            id={id}
            desc={desc}
            navigation={navigation}
          />
        );
      })}
    </ScrollView>
  );
};

export default Homescreen;

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
