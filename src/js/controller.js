// dependencies
import 'core-js/stable';
import 'regenerator-runtime';

// modules
import RecipeView from './views/recipeView';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView';
import * as model from './model';

/* -------------------------------------------------------------------------- */
/*                           parcel keeps the state                           */
/* -------------------------------------------------------------------------- */

if (module.hot) {
  module.hot.accept();
}

/* -------------------------------------------------------------------------- */
/*                                 controllers                                */
/* -------------------------------------------------------------------------- */

const controlRecipes = async () => {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;
    RecipeView.renderSpinner();

    await model.getRecipe(recipeId);
    RecipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    RecipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    const query = SearchView.getQuery();
    if (!query) return;
    ResultsView.renderSpinner();

    await model.loadSearchResults(query);
    ResultsView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
    RecipeView.renderError();
  }
};

/* -------------------------------------------------------------------------- */
/*                                    init                                    */
/* -------------------------------------------------------------------------- */

(() => {
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandleSearch(controlSearchResults);
})();
