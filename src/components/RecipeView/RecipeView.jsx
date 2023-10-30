import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const RecipeView = () => {
  const dispatch = useDispatch();
  const { recipeID } = useParams();
  const addIngredientInputRef = useRef(null);
  const addStepInputRef = useRef(null);
  const addNoteInputRef = useRef(null);

  useEffect(() => {
    dispatch({ type: "FETCH_SELECTED_RECIPE", payload: recipeID });
  }, [dispatch, recipeID]);

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENTS", payload: recipeID });
  }, [dispatch, recipeID]);

  useEffect(() => {
    dispatch({ type: "FETCH_STEPS", payload: recipeID });
  }, [dispatch, recipeID]);

  useEffect(() => {
    dispatch({ type: "FETCH_NOTES", payload: recipeID });
  }, [dispatch, recipeID]);

  const recipe = useSelector((store) => store.selectedRecipe);
  const ingredients = useSelector((store) => store.ingredients);
  const steps = useSelector((store) => store.steps);
  const notes = useSelector((store) => store.notes);

  // Check if the recipe exists
  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const handleAddIngredient = () => {
    if (addIngredientInputRef.current && addIngredientInputRef.current.value.trim() !== "") {
      dispatch({
        type: "ADD_INGREDIENT",
        payload: { recipeID, ingredientName: addIngredientInputRef.current.value },
      });
      addIngredientInputRef.current.value = ""; // Clear the input field
    }
  };
  

  const handleDeleteIngredient = (ingredientID) => {
    dispatch({ type: "DELETE_INGREDIENT", payload: { recipeID, ingredientID } });
  };

  const handleAddStep = () => {
    if (addStepInputRef.current && addStepInputRef.current.value.trim() !== "") {
      dispatch({
        type: "ADD_STEP",
        payload: { recipeID, stepDescription: addStepInputRef.current.value },
      });
      addStepInputRef.current.value = ""; // Clear the input field
    }
  };
  
  const handleDeleteStep = (stepID) => {
    dispatch({ type: "DELETE_STEP", payload: { recipeID, stepID } });
  };

  const handleAddNote = () => {
    if (addNoteInputRef.current && addNoteInputRef.current.value.trim() !== "") {
      dispatch({
        type: "ADD_NOTE",
        payload: { recipeID, noteDescription: addNoteInputRef.current.value },
      });
      addNoteInputRef.current.value = ""; // Clear the input field
    }
  };
  
  const handleDeleteNote = (noteID) => {
    dispatch({ type: "DELETE_NOTE", payload: { recipeID, noteID } });
  };
  

  return (
    <div className="recipe-view">
      <h2 className="recipe-name">
        {recipe.recipeName}
        <button className="edit-button">Edit Name</button>
      </h2>

      <div className="recipe-section">
        <h3>Ingredients</h3>
        <input placeholder="Ingredient" type="text" ref={addIngredientInputRef} /><button className="add-button" onClick={handleAddIngredient}>Add</button>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.ingredientName}
              <button onClick={() => handleDeleteIngredient(ingredient.ingredientID)} className="delete-button">X</button>
              
            </li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <h3>Steps</h3>
        <input placeholder="Steps" type="text" ref={addStepInputRef} /><button className="add-button" onClick={handleAddStep}>Add</button>
        <ol>
          {steps.map((step, index) => (
            <li key={index}>
              {step.stepDescription}
              <button onClick={() => handleDeleteStep(step.stepID)} className="delete-button">X</button>
              
            </li>
          ))}
        </ol>
      </div>

      <div className="recipe-section">
        <h3>Notes</h3>
        <input placeholder="Notes" type="text" ref={addNoteInputRef} /><button className="add-button" onClick={handleAddNote}>Add</button>
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              {note.noteDescription}
              <button onClick={() => handleDeleteNote(note.noteID)} className="delete-button">X</button>
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeView;
