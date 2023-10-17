import React from 'react';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function AddRecipe() {
  const dispatch = useDispatch();

  const [recipeName, setRecipeName] = useState("");

  useEffect(() => {

  }, []);

  const getRecipeToAdd = () => {
    dispatch({ type: 'FETCH_RECIPE_TO_ADD'})
  };

  const addRecipe = (e) => {
    e.preventDefault();
    dispatch({type: 'ADD_RECIPE', payload: { name: recipeName }})
  };

  return (
    <div className="container">
      <h2>Add a Recipe</h2>
      <form onSubmit={addRecipe}>
        Name:{" "}
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddRecipe;
