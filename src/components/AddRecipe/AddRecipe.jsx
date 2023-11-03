import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// mat UI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import "./AddRecipe.css";

function AddRecipe() {
  const dispatch = useDispatch();
  const recipeToAdd = useSelector((store) => store.recipeToAdd.recipeToAdd);

  const nameInputRef = useRef(null);
  const ingredientInputRef = useRef(null);
  const stepInputRef = useRef(null);
  const noteInputRef = useRef(null);

  const addName = () => {
    dispatch({
      type: "ADDRECIPE_NAME",
      payload: nameInputRef.current.value,
    });
    nameInputRef.current.value = ""; // Clear the input field
  };

  const addIngredient = () => {
    dispatch({
      type: "ADDRECIPE_INGREDIENT",
      payload: ingredientInputRef.current.value,
    });
    ingredientInputRef.current.value = ""; // Clear the input field
  };

  const addStep = () => {
    dispatch({
      type: "ADDRECIPE_STEP",
      payload: stepInputRef.current.value,
    });
    stepInputRef.current.value = ""; // Clear the input field
  };

  const addNote = () => {
    dispatch({
      type: "ADDRECIPE_NOTE",
      payload: noteInputRef.current.value,
    });
    noteInputRef.current.value = ""; // Clear the input field
  };

  const addRecipe = () => {
    dispatch({
      type: "ADDRECIPE_RECIPE",
      payload: recipeToAdd,
    });
    // Clear your recipeToAdd state or perform any other necessary actions. TODO
  };

  return (
    <div className="container">
      <Card className="add-recipe-card">
        <CardContent className="add-form">
          <h2 className="add-form-heading">Add a Recipe</h2>
          <div className="form-input">
            <label>Name:</label>
            <input type="text" className="input-field" ref={nameInputRef} />
            <button className="button" onClick={addName}>Set Name</button>
          </div>
          <div className="form-input">
            <label>Ingredients:</label>
            <input type="text" className="input-field" ref={ingredientInputRef} />
            <button className="button" onClick={addIngredient}>Add Ingredient</button>
          </div>
          <div className="form-input">
            <label>Cooking Steps:</label>
            <input type="text" className="input-field" ref={stepInputRef} />
            <button className="button" onClick={addStep}>Add Step</button>
          </div>
          <div className="form-input">
            <label>Notes:</label>
            <input type="text" className="input-field" ref={noteInputRef} />
            <button className="button" onClick={addNote}>Add Note</button>
          </div>
        </CardContent>
      </Card>
      <Card className="recipe-card">
        <CardContent className="recipe-to-add">
          <h1 className="recipe-name">{recipeToAdd.name}</h1>
          <h2>Ingredients</h2>
          <ul className="recipe-list">
            {recipeToAdd.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2>Cooking Steps</h2>
          <ol className="recipe-list">
            {recipeToAdd.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <h2>Notes</h2>
          <ul className="recipe-list">
            {recipeToAdd.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
          <button className="button" onClick={addRecipe}>Submit Recipe</button>
        </CardContent>
      </Card>
    </div>
  );
            }

export default AddRecipe;
