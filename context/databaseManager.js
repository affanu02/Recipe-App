// Inside databaseManager.js
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("dbName.db");

export const addRecipeToDB = async (
  recipeName,
  recipeAuthor,
  recipeDifficulty,
  cookingTime,
  imageUrl,
  ingredients,
  directions,
  description,
  cookTime
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO recipes (recipeName, recipeAuthor, recipeDifficulty, cookingTime, totalLikes, imageUrl, isFavourite, ingredients, directions, description, cookTime) VALUES (?, ?, ?, ?, 20, ?, false, ?, ?, ?, ?);`,
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
