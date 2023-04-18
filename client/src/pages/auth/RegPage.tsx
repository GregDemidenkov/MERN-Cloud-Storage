import React, { useState } from 'react'

import styled from "styled-components"

import { AuthForm } from 'components/pages/auth/AuthForm'

import { InputListType } from 'types/authInput'


export const RegPage: React.FC = () => {

  const [name, setName] = useState("")
  const [secondName, setSecondName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const RegList: InputListType[] = [
    {
      type: "text", 
      placeholder: "Введите имя...",
      value: name,
      setValue: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
    },
    {
      type: "text", 
      placeholder: "Введите фамилию...",
      value: secondName,
      setValue: (e: React.ChangeEvent<HTMLInputElement>) => setSecondName(e.target.value)
    },
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
    <RegPageContainer>
      <AuthForm 
        label = {"Регистрация"}
        buttonLabel = {"Зарегестрироваться"}
        list = {RegList}
        email = {email}
        password = {password}
      />
    </RegPageContainer>
  )
}

const RegPageContainer = styled.div`
  width: 100%;
  height: 100%;
`
