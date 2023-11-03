import axios from "axios";
import { put, takeLatest, call } from "redux-saga/effects";

// Function to add an ingredient
function* addIngredient(action) {
  try {
    const { recipeID, ingredientName } = action.payload;
    yield call(axios.post, `/api/ingredients/${recipeID}`, { ingredientName });
    yield put({ type: "FETCH_INGREDIENTS", payload: recipeID }); // Refresh the ingredients after adding
  } catch (error) {
    console.log("ERROR in addIngredient", error);
    alert("Failed to add ingredient.");
  }
}

// Function to delete an ingredient
function* deleteIngredient(action) {
  try {
    const { recipeID, ingredientID } = action.payload;
    console.log("recipeid:", recipeID, "ingredientID:", ingredientID);
    yield call(axios.delete, `/api/ingredients/${recipeID}/${ingredientID}`);
    yield put({ type: "FETCH_INGREDIENTS", payload: recipeID }); // Refresh the ingredients after deleting
  } catch (error) {
    console.log("ERROR in deleteIngredient", error);
    alert("Failed to delete ingredient.");
  }
}

// Function to get ingredients
function* getIngredients(action) {
  try {
    const recipeID = action.payload;
    let response = yield axios.get(`/api/ingredients/${recipeID}`);
    yield put({ type: "SET_INGREDIENTS", payload: response.data });
  } catch (error) {
    console.log("ERROR in getIngredients", error);
    alert("Failed to retrieve ingredients.");
  }
}

function* ingredientsSaga() {
  yield takeLatest("FETCH_INGREDIENTS", getIngredients);
  yield takeLatest("ADD_INGREDIENT", addIngredient); // Listen for adding ingredient
  yield takeLatest("DELETE_INGREDIENT", deleteIngredient); // Listen for deleting ingredient
}

export default ingredientsSaga;
