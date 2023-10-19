import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Library = () => {
  const dispatch = useDispatch();
  const recipeList = useSelector((store) => store.recipeList);

  useEffect(() => {
    getRecipeList();
  }, []);

  const getRecipeList = () => {
    dispatch({ type: "FETCH_RECIPE_LIST" });
  };

  return (
    <div className="container">
      <h2>Recipe List:</h2>
      <h3>{JSON.stringify(recipeList)}</h3>
      <div>
        {recipeList.map((recipe) => (
          <div
            key={recipe.recipeID}
            style={{
              padding: "10px",
              margin: "10px",
              borderRadius: "10px",
              border: "2px solid gray",
            }}
          >
            <h4>{recipe.name}</h4>
            <p>User ID: {recipe.userID}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
