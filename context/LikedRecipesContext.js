/*
 * Context for managing the liked recipes in app.
 * Provides `LikedRecipesProvider` for state access and manipulation,
 * and a hook `useLikedRecipes` for accessing the liked recipes state.
 */

//import necessary hooks
import React, { createContext, useState, useContext } from "react";

// context object
const LikedRecipesContext = createContext();

//custom hook returns context value
export const useLikedRecipes = () => useContext(LikedRecipesContext);

//provider component LikedRecipesContext, wrap around app that needs access to liked recipes states
export const LikedRecipesProvider = ({ children }) => {
  const [likedRecipes, setLikedRecipes] = useState([]);
  return (
    <LikedRecipesContext.Provider value={{ likedRecipes, setLikedRecipes }}>
      {children}
    </LikedRecipesContext.Provider>
  );
};
