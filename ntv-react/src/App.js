import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import asyncComponent from './component/asyncComponent/AsyncComponent';

const Game = asyncComponent(() => import('./view/game/Game'))
const Levels = asyncComponent(() => import('./view/levels/Levels'))
const Menu = asyncComponent(() => import('./view/menu/Menu'))
const Study = asyncComponent(() => import('./view/study/Study'))
const Shop = asyncComponent(() => import('./view/shop/Shop'))

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route render={() => <Redirect to="/menu" />} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/levels" component={Levels} />
          <Route exact path="/study" component={Study} />
          <Route exact path="/shop" component={Shop} />
        </div>
      </Router>
    )
  }
}