import './styles/styles.css';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import theme from './styles/themeConfig';
import Navbar from './components/Navbar/Navbar';
import Page404 from './components/Page404/Page404';
import Inicio from './components/Inicio/Inicio';
import Dashboard from './components/Dashboard/Dashboard';

export default function App() {
  const { token } = useSelector(store => store.user);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        { token === "" && <Navbar /> }
        <Switch>
          { token !== "" &&
            <React.Fragment>
              <Navbar />
              <Route exact path={process.env.REACT_APP_BASE_PATH} >
                <Redirect to={process.env.REACT_APP_BASE_PATH + "/dashboard"} />
              </Route>
              <Route exact path={process.env.REACT_APP_BASE_PATH + "/dashboard"} component={Dashboard} />
            </React.Fragment>
          }
          <Route exact path={process.env.REACT_APP_BASE_PATH} component={Inicio} />
          <Route exact path={process.env.REACT_APP_BASE_PATH + "/404"} component={Page404} />
          <Route exact path="/">
            <Redirect to={process.env.REACT_APP_BASE_PATH} />
          </Route>
          <Route path="*">
            <Redirect to={process.env.REACT_APP_BASE_PATH + "/404"} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
