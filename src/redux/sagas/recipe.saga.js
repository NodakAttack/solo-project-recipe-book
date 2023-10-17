import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* addRecipe(action) {
    try{
        yield axios.post('/api/recipe', action.payload)
    } catch (error) {
        console.log("ERROR in addRecipe", error);
        alert("Something went wrong!");
      }
}

function* recipeSaga(){
    // step 2: add to our list of sagas
    yield takeLatest('ADD_RECIPE', addRecipe);
}

export default recipeSaga;