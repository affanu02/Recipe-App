import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SimpleButton from "../components/SimpleButton";
import RadioButton from "../components/RadioButton";
import { useThemeStyles } from "../context/ThemeContext";
import Toast from "react-native-toast-message";
import { addRecipeToDB } from "../context/databaseManager";

//Simple page output for settings
export default function AddRecipe() {
  const themeStyles = useThemeStyles();
  const navigation = useNavigation();

  const [recipeName, setRecipeName] = useState("");
  const [recipeAuthor, setRecipeAuthor] = useState("");
  const [ingredientsCost, setIngredientsCost] = useState("");
  const [recipeDifficulty, setRecipeDifficulty] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [description, setDescription] = useState("");
  const [cookTime, setCookTime] = useState("");

  // options for ingredients costs radio buttons
  const ingredientsCostOptions = [
    { label: "Cheap", value: "cheap" },
    { label: "Decent", value: "decent" },
    { label: "Expensive", value: "expensive" },
  ];
  // options for recipe difficulty radio buttons
  const recipeDifficultyOptions = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];
  // options for cooking time radio buttons
  const cookingTimeOptions = [
    { label: "Fast", value: "fast" },
    { label: "Moderate", value: "moderate" },
    { label: "Slow", value: "slow" },
  ];

  const parseArrayInput = (input) => {
    // Avoid converting an empty string into an array with a single empty string
    if (!input.trim()) return [];

    // Split the input into an array and trim each element
    return input.split(",").map((item) => item.trim());
  };

  const parseDirectionsInput = (input) => {
    // Avoid converting an empty string into an array with a single period
    if (!input.trim()) return [];

    // Split the input into an array, add period to each direction, and trim each element
    return input
      .split(".")
      .filter((sentence) => sentence.trim().length > 0)
      .map((direction) => direction.trim() + ".");
  };

  const addData = () => {
    if (
      !recipeName.trim() ||
      !recipeAuthor.trim() ||
      !ingredientsCost.trim() ||
      !recipeDifficulty.trim() ||
      !cookingTime.trim() ||
      !imageUrl.trim() ||
      !ingredients.trim() ||
      !directions.trim() ||
      !description.trim() ||
      !cookTime.trim()
    ) {
      Alert.alert(
        "Missing Fields",
        "Please fill in all fields before adding the recipe."
      );
      return;
    }

    // parse ingredients and directions and error check for correct inputs
    const ingredientsArray = parseArrayInput(ingredients);
    const directionsArray = parseDirectionsInput(directions);
    if (ingredientsArray.length === 0 || directionsArray.length === 0) {
      Alert.alert(
        "Invalid Input",
        "Ingredients and directions cannot be empty."
      );
      return;
    }

    /*
    console.log("Recipe Name:", recipeName);
    console.log("Recipe Author:", recipeAuthor);
    console.log("Cost of Ingredients:", ingredientsCost);
    console.log("Recipe Difficulty:", recipeDifficulty);
    console.log("Cooking Time:", cookingTime);
    console.log("Image URL:", imageUrl);
    console.log("Ingredients:", ingredientsArray);
    console.log("Directions:", directionsArray);
    console.log("Description:", description);
    console.log("Cook Time (minutes):", cookTime);
    */

    console.log({
      recipeName,
      recipeAuthor,
      recipeDifficulty,
      cookingTime,
      ingredients: JSON.stringify(ingredientsArray),
      directions: JSON.stringify(directionsArray),
    });

    addRecipeToDB(
      recipeName,
      recipeAuthor,
      recipeDifficulty,
      cookingTime,
      imageUrl,
      ingredientsArray, // Already parsed as an array
      directionsArray, // Already parsed as an array and includes periods
      description,
      cookTime
    )
      .then(() => {
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Recipe Added",
          text2: "Your recipe has been successfully added to the database.",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      })
      .catch((error) => {
        console.error("Failed to add recipe to the database", error);
        Alert.alert("Error", "Failed to add recipe to the database");
      });

    navigation.navigate("Recipes");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.inputField}>
          <Text style={styles.text}>Recipe Name: </Text>
          <TextInput
            placeholder="Recipe Name"
            value={recipeName}
            onChangeText={setRecipeName}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.text}>Recipe Author: </Text>
          <TextInput
            placeholder="Recipe Author"
            value={recipeAuthor}
            onChangeText={setRecipeAuthor}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.text}>Cost of ingredients: </Text>
          <RadioButton
            options={ingredientsCostOptions}
            selectedOption={ingredientsCost}
            onSelect={setIngredientsCost}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.text}>Recipe Difficulty: </Text>
          <RadioButton
            options={recipeDifficultyOptions}
            selectedOption={recipeDifficulty}
            onSelect={setRecipeDifficulty}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.text}>Cooking Time: </Text>
          <RadioButton
            options={cookingTimeOptions}
            selectedOption={cookingTime}
            onSelect={setCookingTime}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.text}>Image Url: </Text>
          <TextInput
            placeholder="Image URL"
            value={imageUrl}
            onChangeText={setImageUrl}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.text}>Ingredients: </Text>
          <TextInput
            placeholder="Ingredients"
            value={ingredients}
            onChangeText={setIngredients}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.text}>Directions: </Text>
          <TextInput
            placeholder="Directions"
            value={directions}
            onChangeText={setDirections}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.text}>Description: </Text>
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.text}>Cook time in minutes: </Text>
          <TextInput
            placeholder="Cook Time (minutes)"
            value={cookTime}
            onChangeText={setCookTime}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={[styles.text, { color: themeStyles.textColor }]}>
            Click the button to Add the new recipe!
          </Text>
          <SimpleButton onPress={addData} text="Add Recipe" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

//Styles for Settings Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  scrollView: {
    width: "100%",
  },
  inputField: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonContainer: {
    padding: 30,
    alignItems: "center",
  },
  text: {
    fontSize: 17,
  },
});
