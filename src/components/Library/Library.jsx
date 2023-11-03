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
  TextField,
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
      <h1>Recipe List</h1>
      <div>
        <div>
          <TextField
            className="search-input"
            type="text"
            placeholder="Search"
            inputRef={searchInputRef}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ backgroundColor: "red" }}
          >
            Search
          </Button>
          <br />
          <br />
        </div>

        {recipeList.map((recipe) => (
          <Accordion
            key={recipe.recipeID}
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div>
                <Typography
                  variant="h4"
                  onClick={() => displayRecipe(recipe.recipeID)}
                  className="recipe-name"
                >
                  {recipe.recipeName}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="recipe-details">
                <div className="recipe-details-content">
                  <Typography variant="h6">Ingredients:</Typography>
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
