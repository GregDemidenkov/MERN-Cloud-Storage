import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'redux/store'
import { auth } from 'redux/user/asyncActions'

import { Header } from './Header'
import { Footer } from './Footer'

import { paths } from 'routing/config'


export const Layout: React.FC = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("token")) dispatch(auth())
  }, [])

  useEffect(() => {
    if(localStorage.getItem("token")) navigate(paths.disk)
    else navigate(paths.login)
  }, [localStorage.getItem("token")])


  return (
    <>
      <Header />
      <div className='outlet'>
        <Outlet/>
      </div>
      <Footer/>
    </>
  )
}
