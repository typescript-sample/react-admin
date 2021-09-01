// import 'font-awesome/css/font-awesome.min.css';
import * as FontFaceObserver from 'fontfaceobserver';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './assets/css/styles.scss';
import './assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './assets/fonts/material-icon/css/material-icons.css';
import './assets/fonts/Roboto/font.css';
import { store } from './core/store';
import './index.css';
// import {rootEpic} from './redux/rootEpic';
import { unregister } from './registerServiceWorker';
// import {LanguageProvider} from './core/containers/languageProvider';
// import {translationMessages} from './i18n';
var Roboto800 = new FontFaceObserver('Roboto', { weight: 800 });
var Roboto500 = new FontFaceObserver('Roboto', { weight: 500 });
var Roboto400 = new FontFaceObserver('Roboto', { weight: 400 });
var Roboto300 = new FontFaceObserver('Roboto', { weight: 300 });
var Roboto100 = new FontFaceObserver('Roboto', { weight: 100 });
Promise.all([Roboto800.load(), Roboto400.load(), Roboto500.load(), Roboto300.load(), Roboto100.load()]).then(function () {
}, function () {
});
ReactDOM.render(React.createElement(Provider, { store: store },
    React.createElement(BrowserRouter, null,
        React.createElement(App, null))), document.getElementById('root'));
unregister();
//# sourceMappingURL=index.js.map