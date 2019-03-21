import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthStatus } from './store/actions/index';
import Layout from './containers/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';
const BurgerBuilder = lazy(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));

class App extends Component {
  componentDidMount() {
    this.props.autoSignin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          <Suspense fallback={<Spinner />}>
            {routes}
          </Suspense>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    autoSignin: () => dispatch(checkAuthStatus())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
