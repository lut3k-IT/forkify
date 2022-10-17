import View from './View';
import Messages from '../utils/Messages';
import PreviewView from './PreviewView';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _msg = 'Loaded successfully';
  _errMsg = Messages.RESULTS_ERROR;

  _generateMarkup() {
    return this._data.map(result => PreviewView.render(result, false)).join('');
  }
}

export default new ResultsView();
