import Endpoints from './utils/endpoints';
import {
  BASE_URL,
  SEARCH_INIT_PAGE,
  SERACH_RESULTS_PER_PAGE,
} from './utils/config';
import { getRequest } from './utils/helpers';

/* -------------------------------------------------------------------------- */
/*                                   storage                                  */
/* -------------------------------------------------------------------------- */

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: SERACH_RESULTS_PER_PAGE,
    page: SEARCH_INIT_PAGE,
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

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage || 0;
  const end = page * state.search.resultsPerPage || 9;

  return state.search.results.slice(start, end);
};
