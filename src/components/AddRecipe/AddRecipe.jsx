import React, {useRef} from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AddRecipe() {
  const dispatch = useDispatch();

  const recipeToAdd = useSelector((store) => store.recipeToAdd)

  const [recipeName, setRecipeName] = useState("");
  const ingredientInputRef = useRef(null);

  const addRecipe = (e) => {
    e.preventDefault();
    dispatch({type: 'ADD_RECIPE', payload: { name: recipeName }})
  };

  const addIngredient = () => {
    dispatch({type: 'ADD_INGREDIENT', payload: ingredientInputRef.current.value})
  }

  return (
    <div className="container">
      <h1>{recipeToAdd}</h1>
      <h2>Add a Recipe</h2>
      <form onSubmit={addRecipe}>
        Name:{" "}
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
        
        <button>Submit</button>
        <br />

        Ingredient: <input type="text" ref={ingredientInputRef} />
        <button onClick={addIngredient}>Add Ingredient</button>
      </form>
    </div>
  );
}

export default AddRecipe;