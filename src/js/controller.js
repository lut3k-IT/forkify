// dependencies
import 'core-js/stable';
import 'regenerator-runtime';

// modules
import recipeView from './views/recipeView';
import * as model from './model';

/* -------------------------------- requests -------------------------------- */
const controlRecipes = async () => {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;
    recipeView.renderSpinner();

    await model.getRecipe(recipeId);
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

/* ----------------------------- event listener ----------------------------- */
['load', 'hashchange'].forEach(ev =>
  window.addEventListener(ev, controlRecipes),
);
