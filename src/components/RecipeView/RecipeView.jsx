import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const RecipeView = () => {
  const dispatch = useDispatch();
  const { recipeID } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_SELECTED_RECIPE", payload: recipeID });
  }, [dispatch, recipeID]);

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENTS", payload: recipeID });
  }, [dispatch, recipeID]);

  const recipe = useSelector((store) => store.selectedRecipe);
  const ingredients = useSelector((store) => store.ingredients);

  // Check if the recipe exists
  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  

  return (
    <div className="recipe-view">
      <h2 className="recipe-name">
        {recipe.recipeName}
        <button className="edit-button">Edit Name</button>
      </h2>

      <div className="recipe-section">
        <h3>Ingredients</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.ingredientName} {/* Update this to match your ingredient data structure */}
              <button onClick={() => handleDeleteIngredient(ingredient.ingredientID)} className="delete-button">X</button>
              <button className="edit-button">Edit</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <h3>Steps</h3>
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>
              {step}
              <button className="delete-button">X</button>
              <button className="edit-button">Edit</button>
            </li>
          ))}
        </ol>
      </div>

      <div className="recipe-section">
        <h3>Notes</h3>
        <ul>
          {recipe.notes.map((note, index) => (
            <li key={index}>
              {note}
              <button className="delete-button">X</button>
              <button className="edit-button">Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeView;
