import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import asyncComponent from './component/asyncComponent/AsyncComponent';

const Menu = asyncComponent(() => import('./view/menu/Menu'))
const LevelOne = asyncComponent(() => import('./view/levels/LevelOne'))
const LevelTwo = asyncComponent(() => import('./view/levels/LevelTwo'))
const Game = asyncComponent(() => import('./view/game'))
const Shop = asyncComponent(() => import('./view/shop'))
const Purchase = asyncComponent(() => import('./view/purchase'))

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Menu}/>

        </Switch>
    </HashRouter>
);


export default BasicRoute;