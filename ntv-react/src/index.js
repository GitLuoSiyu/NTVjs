import React from 'react';
import ReactDOM from 'react-dom';
import './styles/common.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './redux/store'

import { BrowserRouter as Router, Route } from 'react-router-dom';
import asyncComponent from './component/asyncComponent/AsyncComponent';
const Game = asyncComponent(() => import('./view/game/Game'))
const Levels = asyncComponent(() => import('./view/levels/Levels'))
const Menu = asyncComponent(() => import('./view/menu/Menu'))
const Study = asyncComponent(() => import('./view/study/Study'))
const Shop = asyncComponent(() => import('./view/shop/Shop'))

ReactDOM.render((
<Provider store={store}>
  <Router>
    <div className="router-wrap">
      <App />
      <Route exact path="/" component={Menu} />
      <Route path="/game/:id" component={Game} />
      <Route path="/menu" component={Menu} />
      <Route path="/levels" component={Levels} />
      <Route path="/study" component={Study} />
      <Route path="/shop" component={Shop} />
    </div>
  </Router>
</Provider>
), document.getElementById('root'))

serviceWorker.unregister();
