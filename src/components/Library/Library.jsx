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
      <h1>---Recipe List---</h1>
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
            <h2>{recipe.recipeName}</h2>
            <h4>Ingredients:</h4>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
