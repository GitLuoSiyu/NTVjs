import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import asyncComponent from './component/asyncComponent/AsyncComponent';

const Menu = asyncComponent(() => import('./view/menu'))
const LevelOne = asyncComponent(() => import('./view/levels/LevelOne'))
const LevelTwo = asyncComponent(() => import('./view/levels/LevelTwo'))
const Game = asyncComponent(() => import('./view/game'))
const Shop = asyncComponent(() => import('./view/shop'))
const Purchase = asyncComponent(() => import('./view/purchase'))

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route render={() => <Redirect to="/menu" />} />
          <Route exact path="/menu" component={Menu} />
          {/* <Route exact path="/game" component={Game} />
          <Route exact path="/levelone" component={LevelOne} />
          <Route exact path="/leveltwo" component={LevelTwo} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/purchase" component={Purchase} /> */}
        </div>
      </Router>
    )
  }
}