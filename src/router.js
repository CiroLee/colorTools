import React from 'react';
import './index.css';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import config from './configs/config';
import Home from './pages/home';
import ColorPlate from './pages/colorPlate';
import ColorGradient from './pages/colorGradient'
import NavButtonGroup from './components/NavButtonGroup';
const {navbuttons} = config;

const BasicRoute = () => (
  <Router>
    <div className="main-container">
      <NavButtonGroup
        navButtons={navbuttons.navButtons}
        mainButton={navbuttons.main}
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/colorplate" component={ColorPlate} />
        <Route exact path="/colorgradient" component={ColorGradient} />
      </Switch>
    </div>
  </Router>
);

export default BasicRoute;