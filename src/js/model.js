import Endpoints from './utils/Endpoints';
import {
  BASE_URL,
  SEARCH_INIT_PAGE,
  SERACH_RESULTS_PER_PAGE,
} from './utils/config';
import { getRequest, postRequest } from './utils/helpers';
import { API_KEY } from './utils/config';

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
    page: SEARCH_INIT_PAGE,
    resultsPerPage: SERACH_RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

/* -------------------------------------------------------------------------- */
/*                                localstorage                                */
/* -------------------------------------------------------------------------- */

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
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

  persistBookmarks();
};

export const deleteBookmark = id => {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const createRecipeObject = data => {
  const { recipe } = data?.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

/* -------------------------------------------------------------------------- */
/*                                  requests                                  */
/* -------------------------------------------------------------------------- */

export const getRecipe = async recipeId => {
  try {
    const response = await getRequest(
      `${BASE_URL}/${Endpoints.RECIPES}/${recipeId}`,
    );

    state.recipe = createRecipeObject(response?.data);

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
      `${BASE_URL}/${Endpoints.RECIPES}?search=${query}`,
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

export const postRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3) throw new Error('Wrong ingredient format!');

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await postRequest(
      `${BASE_URL}/${Endpoints.RECIPES}?key=${API_KEY}`,
      recipe,
    );
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    //FIXME: przy errorze nie da się ponownie otworzyć modala do dodawania przepisu
    //FIXME: pokazuje że brakuje pola ID
    throw err;
  }
};

/* -------------------------------------------------------------------------- */
/*                                    init                                    */
/* -------------------------------------------------------------------------- */

(() => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
})();
