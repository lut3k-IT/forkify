import Endpoints from './utils/Endpoints';
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
  recipe: {
    id: 0,
    title: '',
    publisher: '',
    imageUrl: '',
    ingredients: [],
    sourceUrl: '',
    servings: '',
    cookingTime: '',
    bookmarked: false,
  },
  search: {
    query: '',
    results: [],
    resultsPerPage: SERACH_RESULTS_PER_PAGE,
    page: SEARCH_INIT_PAGE,
  },
  bookmarks: [],
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

    if (state.bookmarks.some(bookmark => bookmark.id === recipeId))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
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
    state.search.page = 1;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/* -------------------------------------------------------------------------- */
/*                                    utils                                   */
/* -------------------------------------------------------------------------- */

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage || 0;
  const end = page * state.search.resultsPerPage || 9;

  return state.search.results.slice(start, end);
};

export const updateServings = newServing => {
  state.recipe.ingredients?.forEach(ing => {
    ing.quantity *= newServing / state.recipe.servings;
  });

  state.recipe.servings = newServing;
};

export const addBookmark = recipe => {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = id => {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
