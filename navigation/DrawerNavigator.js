import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import RecipeStackNavigator from "./RecipeStackNavigator";
import Settings from "../screens/Settings";
import Favourites from "../screens/Favourites";
import Animations from "../screens/Animation";
import AddRecipe from "../screens/AddRecipe";
import EditRecipe from "../screens/EditRecipe";
import { useThemeStyles } from "../context/ThemeContext";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const themeStyles = useThemeStyles();

  return (
    <Drawer.Navigator
      initialRouteName="Recipes"
      screenOptions={{
        drawerActiveBackgroundColor: themeStyles.headerColor,
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: themeStyles.textColor,
        drawerStyle: {
          backgroundColor: themeStyles.backgroundColor,
        },
        headerStyle: { backgroundColor: themeStyles.headerColor },
        headerTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="Recipes"
        component={RecipeStackNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favourites"
        component={Favourites}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Animations"
        component={Animations}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="play-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Add Recipes"
        component={AddRecipe}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="add-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="EditRecipe"
        component={EditRecipe}
        options={{
          drawerLabel: () => null, // Hide it from the drawer menu
          title: "Edit Recipe", // Use title to specify the header title
          drawerIcon: () => null, // Hide the icon as well
          drawerItemStyle: { height: 0 }, // Minimize the space it takes up
        }}
      />
    </Drawer.Navigator>
  );
}
