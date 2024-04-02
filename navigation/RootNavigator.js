import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import Animations from "../screens/Animation";
import { ThemeProvider } from "../context/ThemeContext";

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <ThemeProvider>
      <Stack.Navigator initialRouteName="Animations">
        <Stack.Screen
          name="Animations"
          component={Animations}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainApp"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </ThemeProvider>
  );
};

export default RootNavigator;
