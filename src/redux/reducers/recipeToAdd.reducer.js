
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
    case 'ADD_NAME':
      return {
        ...state,
        recipeToAdd: {
          ...state.recipeToAdd,
          name: action.payload,
        },
      };
    case 'ADD_INGREDIENT':
      return {
        ...state,
        recipeToAdd: {
          ...state.recipeToAdd,
          ingredients: [...state.recipeToAdd.ingredients, action.payload],
        },
      };
    case 'ADD_STEP':
      return {
        ...state,
        recipeToAdd: {
          ...state.recipeToAdd,
          steps: [...state.recipeToAdd.steps, action.payload],
        },
      };
    case 'ADD_NOTE':
      return {
        ...state,
        recipeToAdd: {
          ...state.recipeToAdd,
          notes: [...state.recipeToAdd.notes, action.payload],
        },
      };
    default:
      return state;
  }
};

export default recipeToAddReducer;
