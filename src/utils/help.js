import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
export const createRoutes = (routesConfig) => {
  const routesM = (config) => {
    return config.map(op => {
      op.children && op.children.length && (op.children = routesM(op.children));
      return createRoute(op);
    })
  }
  const routes = routesM(routesConfig);

  return <Switch>{routes}</Switch>
}


export const createRoute = (routeConfig) => {
  let {
    component: Comp,
    path,
    indexRoute,
    title,
    exact,
    ...other
  } = routeConfig;

  if (indexRoute && Array.isArray(other.children)) {
    other.children.unshift(
      <Redirect key={path + '_redirect'} exact from={path} to={indexRoute} />
    )
  }
  const routerPrpps = {
    key: path,
    render: props => {
      return <Comp routerList={other} {...props} ></Comp>
    }
  }
  return <Route path={path} exact={!!exact} {...routerPrpps} key={Math.random()} ></Route>
}