import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getIngredients(action) {
  try {
    const recipeID = action.payload; // Get the recipeID from the action payload
    let response = yield axios.get(`/api/ingredients/${recipeID}`);
    yield put({ type: "SET_INGREDIENTS", payload: response.data });
  } catch (error) {
    console.log("ERROR in getIngredients", error);
    alert("Something went wrong!");
  }
}

function* ingredientsSaga() {
  yield takeLatest("FETCH_INGREDIENTS", getIngredients);
}

export default ingredientsSaga;
