import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const RecipeView = () => {
  const dispatch = useDispatch();
  const { recipeID } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_SELECTED_RECIPE", payload: recipeID });
  }, [dispatch, recipeID]);

  const recipe = useSelector((store) => store.selectedRecipe);

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
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient}
              <button onClick={() => dispatch({ type: "DELETE_INGREDIENT", payload: index })} className="delete-button">X</button>
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
