import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LikedRecipesProvider } from "./context/LikedRecipesContext";
import { ThemeProvider } from "./context/ThemeContext";
import RootNavigator from "./navigation/RootNavigator";
import * as SQLite from "expo-sqlite";
import Toast from "react-native-toast-message";

const db = SQLite.openDatabase("dbName.db");

const setupDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS recipes;",
        [],
        () => {
          console.log("Recipes table dropped");
        },
        (t, error) => {
          console.log("Error dropping recipes table:", error);
        }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS recipes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          recipeName TEXT,
          recipeAuthor TEXT,
          recipeDifficulty TEXT,
          cookingTime TEXT,
          imageUrl TEXT,
          ingredients TEXT,
          directions TEXT,
          description TEXT,
          cookTime INTEGER,
          totalLikes INTEGER DEFAULT 20,
          isFavourite BOOLEAN DEFAULT false,
          amountOfIngredients TEXT
        );`,
        [],
        () => {
          console.log("Recipes table created");
          resolve();
        },
        (_, error) => {
          console.log("Error creating recipes table:", error);
          reject(error);
        }
      );
    });
  });
};

export default function App() {
  useEffect(() => {
    setupDatabaseAsync()
      .then(() => {
        console.log("Database setup completed!");
      })
      .catch((err) => {
        console.error("Error setting up database:", err);
      });
  }, []);

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
