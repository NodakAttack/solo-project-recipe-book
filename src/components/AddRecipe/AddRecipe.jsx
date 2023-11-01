import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

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
      <h2>Add a Recipe</h2>
      Name: <input type="text" ref={nameInputRef} />
      <button onClick={addName}>Set Name</button>
      <br />
      <h2>{recipeToAdd.name}</h2>
      <br />

      Ingredients:
      <input type="text" ref={ingredientInputRef} />
      <button onClick={addIngredient}>Add Ingredient</button>
      <ul>
        {recipeToAdd.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      Cooking Steps:
      <input type="text" ref={stepInputRef} />
      <button onClick={addStep}>Add Step</button>
      <ul>
        {recipeToAdd.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>

      Notes:
      <input type="text" ref={noteInputRef} />
      <button onClick={addNote}>Add Note</button>
      <ul>
        {recipeToAdd.notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>

      <button onClick={addRecipe}>Submit Recipe</button>
    </div>
  );
}

export default AddRecipe;
