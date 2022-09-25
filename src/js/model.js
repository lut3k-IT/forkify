import axios from 'axios';
import endpoints from './names/endpoints';
const BASE_URL = 'https://forkify-api.herokuapp.com/api/v2';

export const state = {
  recipe: {},
};

export const loadRecipe = async recipeId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${endpoints.RECIPES}/${recipeId}`,
    );

    const { recipe } = response?.data?.data;
    state.recipe = {
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      title: recipe.title,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      id: recipe.id,
    };
  } catch (err) {
    console.error(err);
  }
};
