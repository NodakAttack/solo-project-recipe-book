import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getRecipeList() {
    try {
      let response = yield axios.get("/api/recipe");
      // pass to the reducer
      yield put({ type: "SET_RECIPE_LIST", payload: response.data });
    } catch (error) {
      console.log("ERROR in getRecipeList", error);
      alert("Something went wrong!");
    }
  }

function* addRecipe(action) {
    try{
        yield axios.post('/api/recipe', action.payload)
        yield put({type: 'FETCH_RECIPE_LIST'})
    } catch (error) {
        console.log("ERROR in addRecipe", error);
        alert("Something went wrong!");
      }
}

function* recipeSaga(){
    yield takeLatest('FETCH_RECIPE_LIST', getRecipeList);
    yield takeLatest('ADD_RECIPE', addRecipe);
}

export default recipeSaga;