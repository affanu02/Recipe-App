import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SimpleButton from "../components/SimpleButton";

const { width, height } = Dimensions.get("window");
const itemWidth = width / 2;

export default function AnimationsScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(0)).current;

  //title fade in
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Animate to opacity: 1 (opaque)
      duration: 2000, // Duration for the animation
      useNativeDriver: true, // Add this to use native driver for better performance
    }).start();
  }, [fadeAnim]);

  // Function to slide components up
  const handlePress = () => {
    Animated.timing(slideUpAnim, {
      toValue: -height, // Move up off the screen
      duration: 400, // Duration of the slide up animation
      useNativeDriver: true,
    }).start(() => {
      // Perform action after the animation ends
      navigateToMainScreen();
    });
  };

  const navigateToMainScreen = () => {
    navigation.navigate("MainApp", {
      screen: "Recipes",
      params: {
        screen: "RecipesList",
      },
    });
  };

  return (
    <ImageBackground
      source={require("../assets/animation-background.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.darkTint}>
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.center,
              { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] },
            ]}
          >
            <Text style={styles.title}>Recipes Roulette</Text>
            <Text style={styles.header}>CIS*4030</Text>
          </Animated.View>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }],
            }}
          >
            <SimpleButton onPress={handlePress} text="Sign-In" />
          </Animated.View>
        </View>
      </View>
    </ImageBackground>
  );
}

//styles for Animation screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  darkTint: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  signupButton: {
    width: itemWidth - 20,
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
  center: {
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    paddingBottom: 15,
    color: "white",
  },
  header: {
    fontSize: 20,
    color: "white",
    paddingBottom: 40,
  },
  text: {
    color: "white",
    fontSize: 15,
  },
});
