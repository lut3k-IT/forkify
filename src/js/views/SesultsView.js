import View from './View';
import Messages from '../utils/Messages';
import icons from '/src/img/icons.svg';

console.log(Messages.RESULTS_ERROR);

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _msg = 'Loaded successfully';
  _errMsg = Messages.RESULTS_ERROR;

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    return `
    <li class="preview">
      <a class="preview__link" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.imageUrl}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
    `;
  }
}

export default new ResultsView();
