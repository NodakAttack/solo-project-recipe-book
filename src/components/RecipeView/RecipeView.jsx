import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import AddImage from "../AddImage/AddImage";

import "./RecipeView.css";
import "bootstrap-icons/font/bootstrap-icons.css";


// mat UI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const RecipeView = () => {
  const dispatch = useDispatch();
  const { recipeID } = useParams();
  const addIngredientInputRef = useRef(null);
  const addStepInputRef = useRef(null);
  const addNoteInputRef = useRef(null);

  useEffect(() => {
    // Fetch selected recipe, ingredients, steps, and notes
    dispatch({ type: "FETCH_SELECTED_RECIPE", payload: recipeID });
    dispatch({ type: "FETCH_INGREDIENTS", payload: recipeID });
    dispatch({ type: "FETCH_STEPS", payload: recipeID });
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
    if (
      addIngredientInputRef.current &&
      addIngredientInputRef.current.value.trim() !== ""
    ) {
      dispatch({
        type: "ADD_INGREDIENT",
        payload: {
          recipeID,
          ingredientName: addIngredientInputRef.current.value,
        },
      });
      addIngredientInputRef.current.value = ""; // Clear the input field
    }
  };

  const handleDeleteIngredient = (ingredientID) => {
    dispatch({
      type: "DELETE_INGREDIENT",
      payload: { recipeID, ingredientID },
    });
  };

  const handleAddStep = () => {
    if (
      addStepInputRef.current &&
      addStepInputRef.current.value.trim() !== ""
    ) {
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

  const handleEditStep = (step) => {
    const editedStep = prompt("Edit Step", step.stepDescription);
    if (editedStep !== null) {
      dispatch({
        type: "EDIT_STEP",
        payload: { recipeID, stepID: step.stepID, stepDescription: editedStep },
      });
    }
  };

  const handleAddNote = () => {
    if (
      addNoteInputRef.current &&
      addNoteInputRef.current.value.trim() !== ""
    ) {
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

  const handleEditNote = (note) => {
    const editedNote = prompt("Edit Note", note.noteDescription);
    if (editedNote !== null) {
      dispatch({
        type: "EDIT_NOTE",
        payload: { recipeID, noteID: note.noteID, noteDescription: editedNote },
      });
    }
  };

  return (
    <div className="recipe-view">
      <div className="left-section">
        <Card sx={{ maxWidth: 545, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
         
          <CardContent>
            <h2 className="recipe-name">
              {recipe.recipeName}{' '}
            </h2>

            <div className="recipe-section">
              <h3>Ingredients</h3>
              <input
                placeholder="Ingredient"
                type="text"
                ref={addIngredientInputRef}
              />
              <i className="bi bi-plus-square" onClick={handleAddIngredient} />
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.ingredientName}
                    <div className="action-buttons">
                    <i className="bi bi-trash3" onClick={() => handleDeleteIngredient(ingredient)}/>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="recipe-section">
              <h3>Steps</h3>
              <input placeholder="Steps" type="text" ref={addStepInputRef} />
              <i className="bi bi-plus-square" onClick={handleAddStep} />
              <ol>
                {steps.map((step, index) => (
                  <li key={index}>
                    {step.stepDescription}
                    <div className="action-buttons">
                    <i className="bi bi-pencil  me-2" onClick={() => handleEditStep(step)}/>
                    <i className="bi bi-trash3" onClick={() => handleDeleteStep(step.stepID)} />
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="recipe-section">
              <h3>Notes</h3>
              <input placeholder="Notes" type="text" ref={addNoteInputRef} />
              <i className="bi bi-plus-square" onClick={handleAddNote} />
              <ul>
                {notes.map((note, index) => (
                  <li key={index}>
                    {note.noteDescription}
                    <div className="action-buttons">
                    <i className="bi bi-pencil  me-2" onClick={() => handleEditNote(note)}/>
                    <i className="bi bi-trash3" onClick={() => handleDeleteNote(note.noteID)} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="right-section">
        {recipe.recipePicture && (
          <img
            src={recipe.recipePicture}
            alt="Recipe"
            className="recipe-image"
            style={{
              height: "400px",
              width: "400px",
            }}
          />
        )}
        <AddImage recipeID={recipeID} />
      </div>
    </div>
  );
};

export default RecipeView;
