import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import recipeList from './recipe.reducer'
import recipeToAdd from './recipeToAdd.reducer';
import selectedRecipe from './selectedRecipe.reducer';
import ingredients from './ingredients.reducer';
import steps from './steps.reducer';
import notes from './notes.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  recipeList,
  recipeToAdd,
  selectedRecipe,
  ingredients,
  steps,
  notes,
});

export default rootReducer;
