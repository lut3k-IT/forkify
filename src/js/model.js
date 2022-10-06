import Endpoints from './names/endpoints';
import { BASE_URL } from './config';
import { getRequest } from './helpers';

/* -------------------------------------------------------------------------- */
/*                                   storage                                  */
/* -------------------------------------------------------------------------- */

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

/* -------------------------------------------------------------------------- */
/*                                  requests                                  */
/* -------------------------------------------------------------------------- */

export const getRecipe = async recipeId => {
  try {
    const response = await getRequest(
      `${BASE_URL}${Endpoints.RECIPES}${recipeId}`,
    );
    const { recipe } = response?.data?.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadSearchResults = async query => {
  try {
    state.search.query = query;

    const response = await getRequest(
      `${BASE_URL}${Endpoints.RECIPES}?search=${query}`,
    );
    const { recipes } = response?.data?.data;

    state.search.results = recipes?.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        imageUrl: recipe.image_url,
      };
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
