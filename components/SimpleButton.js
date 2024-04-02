import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default function SimpleButton({ onPress, text }) {
  return (
    <TouchableOpacity style={styles.signupButton} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  signupButton: {
    width: 90,
    height: 40,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: "rgba(39, 127, 245, 0.75)",
    borderColor: "rgba(39, 127, 245, 1)",
  },
  text: {
    color: "white",
    fontSize: 15,
  },
});
