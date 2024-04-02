import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useLikedRecipes } from "../context/LikedRecipesContext";
import recipeList from "../recipe_list.json";
import { useThemeStyles } from "../context/ThemeContext";

export default function FavouritesTracker() {
  const { likedRecipes } = useLikedRecipes();
  const themeStyles = useThemeStyles();

  // Function to find recipe details by name
  const findRecipeDetails = (recipeName) => {
    return recipeList.recipes.find(
      (recipe) => recipe.recipeName === recipeName
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      {likedRecipes.length > 0 ? (
        likedRecipes.map((recipeName, index) => {
          const recipeDetails = findRecipeDetails(recipeName);
          return (
            <View key={index} style={styles.recipeContainer}>
              <Image
                source={{ uri: recipeDetails.imageUrl }}
                style={styles.image}
              />
              <View>
                <Text style={[styles.title, { color: themeStyles.textColor }]}>
                  {recipeDetails.recipeName}
                </Text>
                <Text style={[styles.text, { color: themeStyles.textColor }]}>
                  By {recipeDetails.recipeAuthor}
                </Text>
              </View>
            </View>
          );
        })
      ) : (
        <View style={styles.defaultTextContainer}>
          <Text style={[styles.defaultText, { color: themeStyles.textColor }]}>
            No Favourites Yet!
          </Text>
        </View>
      )}
    </View>
  );
}

//styles for Favourites page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  recipeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingLeft: 10,
    paddingTop: 10,
  },
  defaultTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
  },
  text: {
    fontSize: 12,
    marginLeft: 10,
  },
  defaultText: {
    fontSize: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});
