import axios from "axios";
import { put, takeLatest, call } from "redux-saga/effects";

// Function to add an step
function* addStep(action) {
  try {
    const { recipeID, stepDescription } = action.payload;
    yield call(axios.post, `/api/steps/${recipeID}`, { stepDescription });
    yield put({ type: "FETCH_STEPS", payload: recipeID }); // Refresh the steps after adding
  } catch (error) {
    console.log("ERROR in addStep", error);
    alert("Failed to add step.");
  }
}

// Function to delete an step
function* deleteStep(action) {
  try {
    const { recipeID, stepID } = action.payload;
    yield call(axios.delete, `/api/steps/${recipeID}/${stepID}`);
    yield put({ type: "FETCH_STEPS", payload: recipeID }); // Refresh the steps after deleting
  } catch (error) {
    console.log("ERROR in deleteStep", error);
    alert("Failed to delete step.");
  }
}

// Function to get steps
function* getSteps(action) {
  try {
    const recipeID = action.payload;
    let response = yield axios.get(`/api/steps/${recipeID}`);
    yield put({ type: "SET_STEPS", payload: response.data });
  } catch (error) {
    console.log("ERROR in getSteps", error);
    alert("Failed to retrieve steps.");
  }
}

function* stepsSaga() {
  yield takeLatest("FETCH_STEPS", getSteps);
  yield takeLatest("ADD_STEP", addStep); // Listen for adding step
  yield takeLatest("DELETE_STEP", deleteStep); // Listen for deleting step
}

export default stepsSaga;
