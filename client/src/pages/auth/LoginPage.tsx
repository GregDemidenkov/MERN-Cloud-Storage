import React, { useState } from 'react'

import styled from "styled-components"

import { AuthForm } from 'components/pages/auth/AuthForm'

import { InputListType } from 'types/authInput'


export const LoginPage: React.FC = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const LoginList: InputListType[] = [
    {
      type: "email", 
      placeholder: "Введите адрес электронной почты...",
      value: email,
      setValue: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    },
    {
      type: "password", 
      placeholder: "Введите пароль...",
      value: password,
      setValue: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    },
  ]

  return (
    <LogPageContainer>
      <AuthForm 
        label = {"Вход"}
        buttonLabel = {"Войти"}
        list = {LoginList}
        email = {email}
        password = {password}
      />
    </LogPageContainer>
  )
}

const LogPageContainer = styled.div`
  width: 100%;
  height: 100%;
`