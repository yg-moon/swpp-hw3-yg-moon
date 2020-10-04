import React from 'react';
import './App.css';

import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';

import LogInPage from './containers/LogInPage';
import ArticleListPage from './containers/ArticleListPage';
import ArticleCreatePage from './containers/ArticleCreatePage';
import ArticleDetailPage from './containers/ArticleDetailPage';
import ArticleEditPage from './containers/ArticleEditPage';

import * as actionCreators from './store/actions/index';


function App(props) {
  props.onGetAllUsers();
  props.checkLoginStatus();
  if(props.login_status){ // case: logged in
    return (
      <ConnectedRouter history={props.history}>
        <div className='App'>
            <Switch>
              <Route path='/articles' exact component = {ArticleListPage} />
              <Route path='/articles/create' exact component = {ArticleCreatePage} />
              <Route path='/articles/:id' exact component={ArticleDetailPage}/>
              <Route path='/articles/:id/edit' exact component={ArticleEditPage}/>
              <Redirect exact from='/' to='/articles' />
              <Redirect exact from='/login' to='/articles' />
              <Route render={() => <h1>Not Found</h1>} />
            </Switch>
        </div>
      </ConnectedRouter>
    );
  }
  else{ // case: not logged in
    // if not logged in, redirect every page to login page.
    return (
      <ConnectedRouter history={props.history}>
        <div className='App'>
            <Switch>
              <Route path='/login' exact component = {LogInPage} />
              <Redirect from='/' to='/login' />
            </Switch>
        </div>
      </ConnectedRouter>
    );
  }   
}

const mapStateToProps = state => {
  return {
    login_status: state.usr.selectedUser.logged_in
  };
}

const mapDispatchToProps = dispatch => {
  return {
    checkLoginStatus: () =>
      dispatch(actionCreators.getUser()),
    onGetAllUsers: () =>
      dispatch(actionCreators.getUserList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);