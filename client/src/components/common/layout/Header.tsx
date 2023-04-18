import React from 'react'

import { NavLink } from "react-router-dom"
import { paths } from 'routing/config'

import { useAppDispatch, useAppSelector } from 'redux/store'
import { Logout } from 'redux/user/userSlice'

import styled from "styled-components"
import { theme, flex, MainContainer } from 'assets/styles/constants'

import logoSvg from 'assets/img/logo.svg';
import profileSvg from 'assets/img/profile.svg';


export const Header: React.FC = () => {

  const dispatch = useAppDispatch()

  const { currentUser } = useAppSelector(state => state.user)

  const isAuthBlock = () => {
    return (
      <>
        {
          localStorage.getItem("token")
          ?
          <Profile>
            <AuthItem to = {paths.login} onClick = {() => dispatch(Logout())}>Выход</AuthItem>
            <p>{currentUser.email}</p>
            <img src = {profileSvg}/>
          </Profile>
          :
          <Auth>
            <AuthItem to = {paths.login}>Войти</AuthItem>
            <AuthItem to = {paths.registration}>Зарегестрироваться</AuthItem>
          </Auth>
        }
      </>
    )
  }

  return (
    <HeaderContainer>

      <MainContainer>

        <HeaderContent>
          <Logo>
            <img src = {logoSvg}></img>
            <h1>MERNCloud</h1>
          </Logo>

          {
            isAuthBlock()
          }
        </HeaderContent>

      </MainContainer>

    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  background-color: ${theme.white};
  height: 40px;
  padding: 5px 0;
  box-shadow: 0px 3px 4px rgba(92, 92, 92, 0.25);
`

const HeaderContent = styled.div`
  ${flex}
`

const Logo = styled.div`
  ${flex}

  img {
    margin-right: 16px;
  }

  h1 {
    font-size: 20px;
    font-weight: 700;
    color: ${theme.blue};
  }
`

const Auth = styled.div`
  ${flex}
`

const AuthItem = styled(NavLink)`
  font-size: 16px;
  color: ${theme.blue};

  :first-child {
    margin-right: 27px;
  }
`

const Profile = styled.div`
  ${flex}

  p {
    font-size: 15px;
    color: ${theme.blue};
    margin-right: 11px;
  }
`