import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RecipesHome from "../screens/RecipesHome";
import RecipeChosen from "../screens/RecipeChosen";
import { useThemeStyles } from "../context/ThemeContext";

const Stack = createStackNavigator();

export default function RecipeStackNavigator() {
  const themeStyles = useThemeStyles();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: themeStyles.headerColor },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="RecipesList"
        component={RecipesHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Recipe" component={RecipeChosen} />
    </Stack.Navigator>
  );
}
