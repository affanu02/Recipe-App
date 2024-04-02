import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Switch } from "react-native";
import { useTheme, useThemeStyles } from "../context/ThemeContext";
import SimpleButton from "../components/SimpleButton";
import { dropRecipesTable } from "../context/databaseManager";

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
      <View style={styles.section}>
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
      </View>
      <View>
        <SimpleButton onPress={dropRecipesTable} text="Delete Database" />
      </View>
    </SafeAreaView>
  );
}

//Styles for Settings Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  section: {
    alignItems: "center",
    paddingVertical: 20,
  },
  text: {
    paddingTop: 20,
    fontSize: 20,
  },
});
