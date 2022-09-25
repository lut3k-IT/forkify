// modules
import recipeView from './views/recipeView';
import * as model from './model';

// dependencies
import 'core-js/stable';
import 'regenerator-runtime';

// utils

/* -------------------------------------------------------------------------- */
/*                                   GENERAL                                  */
/* -------------------------------------------------------------------------- */

// api key b3806cbe-6bbb-46f3-ba61-8c39c10d36e7
// const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/* ---------------------------- fetching a recipe --------------------------- */
const controlRecipes = async () => {
  try {
    // recipeContainer.innerHTML = '';
    // getting the ID from the URL hash
    const recipeId = window.location.hash.slice(1);

    if (!recipeId) return;

    // rendering the animation
    recipeView.renderSpinner();

    // loading recipe
    await model.loadRecipe(recipeId);

    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};
// controlRecipes();

['load', 'hashchange'].forEach(ev =>
  window.addEventListener(ev, controlRecipes),
);
