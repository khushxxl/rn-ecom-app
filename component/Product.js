import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const Product = ({ title, image, price, navigation, id, desc }) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    const productItem = {
      title,
      image,
      price,
    };
    dispatch(addToBasket(productItem));
  };
  return (
    <View key={id} style={styles.productContianer}>
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Detail", {
              title: title,
              image: image,
              desc: desc,
              price: price,
              id: id,
            });
          }}
        >
          <Image
            source={{ uri: `${image}` }}
            style={{ height: 100, width: 100 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "flex-start" }}>
        <Text style={styles.productText}>{title}</Text>
        <Text style={[styles.productText, { fontWeight: "600", marginTop: 7 }]}>
          {"₹" + price}
        </Text>
        <View style={{ marginTop: 10 }}>
          <Button title="Add to Cart" onPress={addToCart} />
        </View>
      </View>
    </View>
  );
};

export default Product;

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
