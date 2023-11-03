const initialState = {
  recipeToAdd: {
    name: "",
    ingredients: [],
    steps: [],
    notes: [],
  },
};

const recipeToAddReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDRECIPE_NAME":
      return {
        ...state,
        recipeToAdd: {
          ...state.recipeToAdd,
          name: action.payload,
        },
      };
    case "ADDRECIPE_INGREDIENT":
      return {
        ...state,
        recipeToAdd: {
          ...state.recipeToAdd,
          ingredients: [...state.recipeToAdd.ingredients, action.payload],
        },
      };
    case "ADDRECIPE_STEP":
      return {
        ...state,
        recipeToAdd: {
          ...state.recipeToAdd,
          steps: [...state.recipeToAdd.steps, action.payload],
        },
      };
    case "ADDRECIPE_NOTE":
      return {
        ...state,
        recipeToAdd: {
          ...state.recipeToAdd,
          notes: [...state.recipeToAdd.notes, action.payload],
        },
      };
    case "CLEAR_RECIPE":
      // Reset the state to the initial state
      return {
        ...state,
        recipeToAdd: {
          name: "",
          ingredients: [],
          steps: [],
          notes: [],
        },
      };
    default:
      return state;
  }
};

export default recipeToAddReducer;
