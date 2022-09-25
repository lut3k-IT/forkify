import endpoints from './names/endpoints';
import { BASE_URL } from './config';
import { getRequest } from './helpers';

export const state = {
  recipe: {},
};

export const getRecipe = async recipeId => {
  try {
    const response = await getRequest(
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
