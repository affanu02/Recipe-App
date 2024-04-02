import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useThemeStyles } from "../context/ThemeContext";

const RadioButton = ({ options, selectedOption, onSelect }) => {
  const themeStyles = useThemeStyles();
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.optionContainer}
          onPress={() => onSelect(option.value)}
        >
          <View
            style={[
              styles.circle,
              {
                borderColor: themeStyles.textColor,
              },
            ]}
          >
            {selectedOption === option.value && (
              <View style={styles.checkedCircle} />
            )}
          </View>
          <Text style={[styles.label, { color: themeStyles.textColor }]}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007bff",
  },
  label: {
    fontSize: 16,
  },
});

export default RadioButton;
