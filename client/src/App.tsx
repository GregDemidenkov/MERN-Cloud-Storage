import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { RoutesList, RoutesListAuth } from './routing/routes';

import { Layout } from 'components/common/layout/Layout';
import { useAppSelector } from 'redux/store';


export const App: React.FC = () => {

  const { isAuth } = useAppSelector(state => state.user)

  return (
    <Routes>
      <Route
        path="/"
        element = {<Layout/>}
      >
      {
        !isAuth
        ?
          RoutesListAuth.map((obj, index) => (
            <Route key={index} {...obj} />
          ))
        :
          RoutesList.map((obj, index) => (
            <Route key={index} {...obj} />
          ))
      }
      </Route>
    </Routes>
  )
}
