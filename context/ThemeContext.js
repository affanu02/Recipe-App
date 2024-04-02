import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

// Custom hook for using theme styles
export const useThemeStyles = () => {
  const { theme } = useTheme();

  const styles = {
    backgroundColor: theme === "dark" ? "#333" : "#FFF",
    textColor: theme === "dark" ? "#FFF" : "#333",
    headerColor:
      theme === "dark" ? "rgba(32, 87, 158, 1)" : "rgba(39, 127, 245, 1)",
    navTextColor: theme === "dark" ? "#FFF" : "#333",
    // ... add other style properties that depend on the theme
  };

  return styles;
};

export const ThemeProvider = ({ children }) => {
  // Default theme is light
  const [theme, setTheme] = useState("light");

  // Load theme from storage
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      }
    };
    loadTheme();
  }, []);

  // Save theme to storage
  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
