// Inside databaseManager.js
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("dbName.db");

export const updateRecipeInDB = async (
  id, // assuming each recipe has a unique ID
  recipeName,
  recipeAuthor,
  recipeDifficulty,
  cookingTime,
  imageUrl,
  ingredients,
  directions,
  description,
  cookTime,
  ingredientsCost // Make sure this matches with your schema; earlier you mentioned it should be `amountOfIngredients`
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE recipes 
         SET recipeName = ?, recipeAuthor = ?, recipeDifficulty = ?, cookingTime = ?, imageUrl = ?, 
         ingredients = ?, directions = ?, description = ?, cookTime = ?, amountOfIngredients = ?
         WHERE id = ?;`,
        [
          recipeName,
          recipeAuthor,
          recipeDifficulty,
          cookingTime,
          imageUrl,
          JSON.stringify(ingredients),
          JSON.stringify(directions),
          description,
          parseInt(cookTime),
          ingredientsCost,
          id, // make sure to pass the ID as the last parameter for the WHERE clause
        ],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const addRecipeToDB = async (
  recipeName,
  recipeAuthor,
  recipeDifficulty,
  cookingTime,
  imageUrl,
  ingredients,
  directions,
  description,
  cookTime,
  ingredientsCost
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO recipes (recipeName, recipeAuthor, recipeDifficulty, cookingTime, totalLikes, imageUrl, isFavourite, ingredients, directions, description, cookTime, amountOfIngredients) VALUES (?, ?, ?, ?, 20, ?, false, ?, ?, ?, ?, ?);`,
        [
          recipeName,
          recipeAuthor,
          recipeDifficulty,
          cookingTime,
          imageUrl,
          JSON.stringify(ingredients),
          JSON.stringify(directions),
          description,
          parseInt(cookTime),
          ingredientsCost,
        ],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const fetchRecipesFromDB = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM recipes;",
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => reject(error)
      );
    });
  });
};

export const dropRecipesTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS recipes;",
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};
