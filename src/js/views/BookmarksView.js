import View from './View';
import PreviewView from './PreviewView';
import Messages from '../utils/Messages';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errMsg = Messages.BOOKMARKS_ERROR;

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
