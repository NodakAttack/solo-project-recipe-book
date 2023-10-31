import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// mat UI
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Input,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./Library.css";

const Library = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const recipeList = useSelector((store) => store.recipeList);

  const searchInputRef = useRef(null);

  const handleSearch = () => {
    dispatch({
      type: "FETCH_RECIPE_LIST",
      payload: searchInputRef.current.value,
    });
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
          <Input
            type="text"
            placeholder="Search recipes"
            inputRef={searchInputRef}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
          <br/>
          <br/>
        </div>

        {recipeList.map((recipe) => (
          <Accordion key={recipe.recipeID}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div>
                <Typography
                  variant="h6"
                  onClick={() => displayRecipe(recipe.recipeID)}
                >
                  {recipe.recipeName}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="recipe-details">
                <div className="recipe-details-content">
                  <Typography variant="h4">Ingredients:</Typography>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteRecipe(recipe.recipeID)}
                  >
                    Delete Recipe
                  </Button>
                </div>
                {recipe.recipePicture && (
                  <img
                    src={recipe.recipePicture}
                    alt="Recipe"
                    className="recipe-image"
                  />
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Library;
