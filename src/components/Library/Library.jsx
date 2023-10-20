import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Library = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const recipeList = useSelector((store) => store.recipeList);

  useEffect(() => {
    getRecipeList();
  }, []);

  const getRecipeList = () => {
    dispatch({ type: "FETCH_RECIPE_LIST" });
  };

  const displayRecipe = (recipeToDisplay) => {
    console.log(recipeToDisplay);
    history.push(`/detail/${recipeToDisplay.recipeID}`);
  };

  const deleteRecipe = (recipeID) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch({ type: "DELETE_RECIPE", payload: { recipeId: recipeID } });
    }
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
            onClick={() => displayRecipe(recipe)}
          >
            <h2>
              {recipe.recipeName}{" "}
              <button
                style={{ float: "right" }}
                onClick={() => deleteRecipe(recipe.recipeID)}
              >
                Delete Recipe
              </button>
            </h2>
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
