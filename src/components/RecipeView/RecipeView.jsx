import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const RecipeView = () => {
    const recipe = useSelector(store => store.recipeList)
    const { recipeID } = useParams();
    
  return (
    <div>{recipeID}</div>
  )
}

export default RecipeView