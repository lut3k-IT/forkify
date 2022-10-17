// dependencies
import 'core-js/stable';
import 'regenerator-runtime';

// modules
import * as model from './model';
import RecipeView from './views/RecipeView';
import SearchView from './views/SearchView';
import ResultsView from './views/ResultsView';
import PaginationView from './views/PaginationView';
import BookmarksView from './views/BookmarksView';

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

    // update results view to mark selected recipe
    ResultsView.update(model.getSearchResultsPage());
    BookmarksView.update(model.state.bookmarks);

    // loading recipe
    await model.getRecipe(recipeId);

    // rendering recipe
    RecipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    RecipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    ResultsView.renderSpinner();

    // search query
    const query = SearchView.getQuery();
    if (!query) return;

    // load results
    await model.loadSearchResults(query);

    // render results
    ResultsView.render(model.getSearchResultsPage());

    // render init pagination
    PaginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    RecipeView.renderError();
  }
};

const controlPagination = page => {
  // render new results
  ResultsView.render(model.getSearchResultsPage(page));

  // render new pagination
  PaginationView.render(model.state.search);
};

const controlServings = newServing => {
  // update the recipe servings
  model.updateServings(newServing);

  // update the recipe view
  RecipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  // add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // update the view
  RecipeView.update(model.state.recipe);

  // render the bookmarks
  BookmarksView.render(model.state.bookmarks);
};

/* -------------------------------------------------------------------------- */
/*                                    init                                    */
/* -------------------------------------------------------------------------- */

(() => {
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
})();
