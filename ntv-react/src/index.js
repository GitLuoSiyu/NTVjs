import React from 'react';
import ReactDOM from 'react-dom';
import './style/common.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter , Switch, Route , Redirect } from 'react-router-dom';
import './config/rem'

// view component
import asyncComponent from './utils/asyncComponent';
const Menu = asyncComponent(() => import("./view/menu"));
const LevelOne = asyncComponent(() => import("./view/levels/LevelTwo"));
const LevelTwo = asyncComponent(() => import("./view/levels/LevelOne"));
const Game = asyncComponent(() => import("./view/game"));
const Shop = asyncComponent(() => import("./view/shop"));
const Purchase = asyncComponent(() => import("./view/purchase"));

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Redirect exact from='/' to='/menu'/>
      <Route path="/" component={Menu} />
      <Route path="/levelone" component={LevelOne} />
      <Route path="/leveltwo" component={LevelTwo} />
      <Route path="/game" component={Game} />
      <Route path="/shop" component={Shop} />
      <Route path="/purchase" component={Purchase} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'));

serviceWorker.unregister();
