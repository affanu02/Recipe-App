import React, { useState } from "react";
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
import { updateRecipeInDB } from "../context/databaseManager";

//Simple page output for edit recipe
export default function EditRecipe({ route, navigation }) {
  const themeStyles = useThemeStyles();
  const { item } = route.params;

  const [recipeName, setRecipeName] = useState(item.recipeName);
  const [recipeAuthor, setRecipeAuthor] = useState(item.recipeAuthor);
  const [ingredientsCost, setIngredientsCost] = useState(
    item.amountOfIngredients
  );
  const [recipeDifficulty, setRecipeDifficulty] = useState(
    item.recipeDifficulty
  );
  const [cookingTime, setCookingTime] = useState(item.cookingTime);
  const [imageUrl, setImageUrl] = useState(item.imageUrl);
  const [ingredients, setIngredients] = useState(item.ingredients.join(", "));
  const [directions, setDirections] = useState(item.directions.join(". "));
  const [description, setDescription] = useState(item.description);
  const [cookTime, setCookTime] = useState(item.cookTime.toString());

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

  const updateData = () => {
    // Your validation logic stays the same

    // Call updateRecipeInDB instead of addRecipeToDB
    updateRecipeInDB(
      item.id, // Pass the unique ID of the recipe
      recipeName,
      recipeAuthor,
      recipeDifficulty,
      cookingTime,
      imageUrl,
      parseArrayInput(ingredients),
      parseDirectionsInput(directions),
      description,
      cookTime,
      ingredientsCost
    )
      .then(() => {
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Recipe Updated",
          text2: "Your recipe has been successfully updated in the database.",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      })
      .catch((error) => {
        console.error("Failed to update recipe in the database", error);
        Alert.alert("Error", "Failed to update recipe in the database");
      });

    navigation.goBack(); // Or navigate to a specific screen if needed
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
          <Text style={[styles.text, { color: themeStyles.textColor }]}>
            Recipe Name:{" "}
          </Text>
          <TextInput
            placeholder="Recipe Name"
            placeholderTextColor={themeStyles.textColor}
            value={recipeName}
            onChangeText={setRecipeName}
            style={{ color: themeStyles.textColor }}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={[styles.text, { color: themeStyles.textColor }]}>
            Recipe Author:{" "}
          </Text>
          <TextInput
            placeholder="Recipe Author"
            placeholderTextColor={themeStyles.textColor}
            value={recipeAuthor}
            onChangeText={setRecipeAuthor}
            style={{ color: themeStyles.textColor }}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={[styles.text, { color: themeStyles.textColor }]}>
            Cost of ingredients:{" "}
          </Text>
          <RadioButton
            options={ingredientsCostOptions}
            selectedOption={ingredientsCost}
            onSelect={setIngredientsCost}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={[styles.text, { color: themeStyles.textColor }]}>
            Recipe Difficulty:{" "}
          </Text>
          <RadioButton
            options={recipeDifficultyOptions}
            selectedOption={recipeDifficulty}
            onSelect={setRecipeDifficulty}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={[styles.text, { color: themeStyles.textColor }]}>
            Cooking Time:{" "}
          </Text>
          <RadioButton
            options={cookingTimeOptions}
            selectedOption={cookingTime}
            onSelect={setCookingTime}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={[styles.text, { color: themeStyles.textColor }]}>
            Image Url:{" "}
          </Text>
          <TextInput
            placeholder="Image URL"
            placeholderTextColor={themeStyles.textColor}
            value={imageUrl}
            onChangeText={setImageUrl}
            style={{ color: "rgba(39, 127, 245, 1)" }}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={[styles.text, { color: themeStyles.textColor }]}>
            Ingredients:{" "}
          </Text>
          <TextInput
            placeholder="Ingredients"
            placeholderTextColor={themeStyles.textColor}
            value={ingredients}
            onChangeText={setIngredients}
            style={{ color: themeStyles.textColor }}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={[styles.text, { color: themeStyles.textColor }]}>
            Directions:{" "}
          </Text>
          <TextInput
            placeholder="Directions"
            placeholderTextColor={themeStyles.textColor}
            value={directions}
            onChangeText={setDirections}
            style={{ color: themeStyles.textColor }}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={[styles.text, { color: themeStyles.textColor }]}>
            Description:{" "}
          </Text>
          <TextInput
            placeholder="Description"
            placeholderTextColor={themeStyles.textColor}
            value={description}
            onChangeText={setDescription}
            style={{ color: themeStyles.textColor }}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={[styles.text, { color: themeStyles.textColor }]}>
            Cook time in minutes:{" "}
          </Text>
          <TextInput
            placeholder="Cook Time (minutes)"
            placeholderTextColor={themeStyles.textColor}
            value={cookTime}
            onChangeText={setCookTime}
            style={{ color: themeStyles.textColor }}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={[styles.text, { color: themeStyles.textColor }]}>
            Click the button to Edit the recipe!
          </Text>
          <SimpleButton onPress={updateData} text="Update Recipe" />
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
