import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LikedRecipesProvider } from "./context/LikedRecipesContext";
import { ThemeProvider } from "./context/ThemeContext";
import RootNavigator from "./navigation/RootNavigator";
import * as SQLite from "expo-sqlite";
import Toast from "react-native-toast-message";

const db = SQLite.openDatabase("dbName.db");

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider>
        <LikedRecipesProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </LikedRecipesProvider>
      </ThemeProvider>
      <Toast />
    </SafeAreaView>
  );
}
