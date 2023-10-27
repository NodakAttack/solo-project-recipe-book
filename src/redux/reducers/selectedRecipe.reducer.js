const selectedRecipe = (state = null, action) => {
    switch (action.type) {
      case "SET_SELECTED_RECIPE":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default selectedRecipe;
  