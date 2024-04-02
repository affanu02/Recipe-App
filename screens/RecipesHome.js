import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useLikedRecipes } from "../context/LikedRecipesContext";
import { useThemeStyles } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { fetchRecipesFromDB } from "../context/databaseManager";

//constants
const recipeList = require("../recipe_list.json");
const { width } = Dimensions.get("window");
const itemWidth = width / 2;

const RecipeItem = ({ item, onToggleLike }) => {
  const navigation = useNavigation();

  // toggles the liked heart icon
  const [isLiked, setIsLiked] = useState(false);
  const toggleImage = () => {
    setIsLiked(!isLiked);
    onToggleLike(item.recipeName);
  };

  //measures text with
  const measureText = (text) => {
    const textSize = text.length * 8; // approximate width calculation
    return textSize;
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Recipe", { item })}
      style={styles.itemContainer}
    >
      <ImageBackground
        source={{ uri: item.imageUrl }}
        style={styles.backgroundImage}
      >
        <View style={styles.textOverlay}>
          <View style={styles.textTop}>
            <Text style={styles.itemText}>{item.recipeAuthor}</Text>
            <TouchableOpacity onPress={toggleImage}>
              <Image
                style={[
                  styles.like,
                  {
                    marginLeft: itemWidth - measureText(item.recipeAuthor) - 40,
                  },
                ]}
                source={
                  isLiked
                    ? require("../assets/heart.png")
                    : require("../assets/heart-outline.png")
                }
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.itemTitle}>{item.recipeName}</Text>
            <View style={styles.textBottom}>
              <View style={styles.textRow}>
                <Image
                  style={styles.icon}
                  source={require("../assets/clock.png")}
                />
                <Text style={styles.itemText}>{item.cookTime}</Text>
              </View>
              <View style={styles.textRow}>
                <Image
                  style={styles.icon}
                  source={require("../assets/bag.png")}
                />
                <Text style={styles.itemText}>{item.amountOfIngredients}</Text>
              </View>
              <View style={styles.textRow}>
                <Image
                  style={styles.icon}
                  source={require("../assets/question.png")}
                />
                <Text style={styles.itemText}>{item.recipeDifficulty}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default function RecipesHome() {
  const { likedRecipes, setLikedRecipes } = useLikedRecipes();
  const themeStyles = useThemeStyles();
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchRecipes();
    }, [])
  );

  //fetchs data from JSON file and the local database
  const fetchRecipes = async () => {
    setRefreshing(true); // Start refreshing
    try {
      const dbRecipes = await fetchRecipesFromDB();
      // Convert JSON strings back to arrays if necessary
      const recipesWithStructuredData = dbRecipes.map((recipe) => ({
        ...recipe,
        ingredients: JSON.parse(recipe.ingredients), // Assuming ingredients is a JSON string in the database
        directions: JSON.parse(recipe.directions), // Assuming directions is a JSON string in the database
      }));
      setRecipes([...recipeList.recipes, ...recipesWithStructuredData]);
    } catch (error) {
      console.error("Failed to fetch recipes from database", error);
    }
    setRefreshing(false); // End refreshing
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  //adds the recipe to the array of likedRecipes upon it being liked
  const handleToggleLike = (recipeName) => {
    let newLikedRecipes;
    if (likedRecipes.includes(recipeName)) {
      newLikedRecipes = likedRecipes.filter((name) => name !== recipeName);
    } else {
      newLikedRecipes = [...likedRecipes, recipeName];
    }
    console.log(newLikedRecipes);
    setLikedRecipes(newLikedRecipes);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <RecipeItem item={item} onToggleLike={handleToggleLike} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        refreshing={refreshing}
        onRefresh={fetchRecipes}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("Add Recipes")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 10 },
  itemContainer: {
    width: itemWidth - 20,
    height: itemWidth - 20,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  textTop: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  textOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "space-between",
    padding: 5,
  },
  itemTitle: {
    color: "white",
    fontSize: 20,
  },
  itemText: {
    color: "white",
    fontSize: 9,
  },
  like: {
    width: 30,
    height: 30,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 2,
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    paddingRight: 4,
    paddingLeft: 4,
  },
  textBottom: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "rgba(39, 127, 245, 1)",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
