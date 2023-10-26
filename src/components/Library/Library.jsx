import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Library = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const recipeList = useSelector((store) => store.recipeList);
  const searchResults = useSelector((store) => store.searchResults);

  const searchInputRef = useRef(null);

  const handleSearch = () => {
    dispatch({ type: "FETCH_RECIPE_LIST", payload: searchInputRef.current.value});
  };

  useEffect(() => {
    getRecipeList();
  }, []);

  const getRecipeList = () => {
    dispatch({ type: "FETCH_RECIPE_LIST", payload: "" });
  };

  const displayRecipe = (recipeToDisplay) => {
    console.log(recipeToDisplay);
    history.push(`/detail/${recipeToDisplay}`);
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
      <div>
      <input
            type="text"
            placeholder="Search recipes"
            ref={searchInputRef}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

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
            <h2
              style={{ background: "lightblue" }}
              onClick={() => displayRecipe(recipe.recipeID)}
            >
              {recipe.recipeName}{" "}
            </h2>
            <button
              style={{ float: "right" }}
              onClick={() => deleteRecipe(recipe.recipeID)}
            >
              Delete Recipe
            </button>
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
