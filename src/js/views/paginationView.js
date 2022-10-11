import View from './View';
import icons from '/src/img/icons.svg';

class ResultsView extends View {
  _parentEl = document.querySelector('.pagination');

  //TODO:
  _generateMarkup() {
    const curPage = this._data.page;
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numOfPages > 1) {
      return this._generateMarkupNextPage(curPage);
    }

    // Last page
    if (curPage === numOfPages && numOfPages > 1) {
      return this._generateMarkupPreviousPage(curPage);
    }

    // Other page
    if (curPage < numOfPages) {
      return (
        this._generateMarkupPreviousPage(curPage) +
        this._generateMarkupNextPage(curPage)
      );
    }

    // Page 1, and there are no other pages
    return `
      <div>
        Page 1 of 1
      </div>
    `;
  }

  _generateMarkupPreviousPage(curPage) {
    return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>${curPage - 1}</span>
      </button>
    `;
  }
  _generateMarkupNextPage(curPage) {
    return `
      <button class="btn--inline pagination__btn--next">
        <span>${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new ResultsView();
