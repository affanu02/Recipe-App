import {
  Image,
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { useThemeStyles } from "../context/ThemeContext";

//Access recipeList.json
const recipeList = require("../recipe_list.json");

//output recipe to page
export default function RecipeChosen({ route }) {
  const { item } = route.params;
  const themeStyles = useThemeStyles();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <Text style={[styles.navtitle, { color: themeStyles.textColor }]}>
        {item.recipeName}
      </Text>

      <Image style={styles.image} source={{ uri: item.imageUrl }} />

      <ScrollView>
        <View style={styles.overlay}>
          <Text style={[styles.title, { color: themeStyles.textColor }]}>
            Author: {item.recipeAuthor}
          </Text>

          <Text style={[styles.subtitle, { color: themeStyles.textColor }]}>
            Description
          </Text>
          <Text style={[styles.text, { color: themeStyles.textColor }]}>
            {item.description}
          </Text>

          <Text style={[styles.subtitle, { color: themeStyles.textColor }]}>
            Ingredients
          </Text>
          <View style={styles.ingredients}>
            {item.ingredients.map((ingredient, index) => (
              <Text
                key={index}
                style={[
                  styles.textIngredients,
                  { color: themeStyles.textColor },
                ]}
              >
                {index + 1} {ingredient}
              </Text>
            ))}
          </View>

          <Text style={[styles.subtitle, { color: themeStyles.textColor }]}>
            Time to Cook
          </Text>
          <Text style={[styles.text, { color: themeStyles.textColor }]}>
            {item.cookTime} mins
          </Text>

          <Text style={[styles.subtitle, { color: themeStyles.textColor }]}>
            Directions
          </Text>
          {item.directions.map((direction, index) => (
            <Text
              key={index}
              style={[styles.text, { color: themeStyles.textColor }]}
            >
              {index + 1} {direction}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

//Styles for the Recipe chosen Page
const styles = StyleSheet.create({
  navtitle: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    padding: 8,
  },
  subtitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 8,
    marginTop: 12,
  },
  text: {
    color: "black",
    marginBottom: 8,
  },
  textIngredients: {
    color: "black",
    marginBottom: 8,
    marginRight: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  ingredients: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    color: "black",
    fontSize: 20,
    marginBottom: 18,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    resizeMode: "contain",
    height: "30%",
    width: "100%",
  },
});
