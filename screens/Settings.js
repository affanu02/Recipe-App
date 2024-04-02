import React, { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, Switch } from "react-native";
import { useTheme, useThemeStyles } from "../context/ThemeContext";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const themeStyles = useThemeStyles();
  const [isEnabled, setIsEnabled] = useState(theme === "dark");

  useEffect(() => {
    setIsEnabled(theme === "dark");
  }, [theme]);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    toggleTheme();
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <Text style={[styles.text, { color: themeStyles.textColor }]}>
        Toggle Theme Preference:
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </SafeAreaView>
  );
}

//Styles for Settings Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    paddingTop: 20,
    fontSize: 20,
  },
});
