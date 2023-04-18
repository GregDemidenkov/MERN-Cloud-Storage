import React from 'react'

import styled from "styled-components"
import { theme } from 'assets/styles/constants'

import { AuthInput } from 'components/ui/auth/AuthInput'
import { AuthButton } from 'components/ui/auth/AuthButton'

import { InputListType } from 'types/authInput'
import { useAppDispatch } from 'redux/store'
import { login, registartion } from 'redux/user/asyncActions'


type AuthFormType = {
    label: string,
    buttonLabel: string,
    list: InputListType[],
    email: String,
    password: String,
}

export const AuthForm: React.FC<AuthFormType> = ({
    label,
    buttonLabel,
    list,
    email,
    password,
}) => {

    const dispatch = useAppDispatch()

    return (
        <AuthFormContainer>
            <AuthLabel>{label}</AuthLabel>
            <AuthFormList>
                {
                    list.length !== 0 &&
                    list.map((el, i) => (
                        <AuthInput 
                            key = {i}
                            type = {el.type}
                            placeholder = {el.placeholder}
                            onChange = {el.setValue}
                        />
                    ))
                }
                <AuthButton
                    disabled = {false}
                    onClick = {
                        label === "Регистрация" 
                        ?
                        () => dispatch(registartion({email, password}))
                        :
                        () => dispatch(login({email, password}))
                    }
                >
                    {buttonLabel}
                </AuthButton>
            </AuthFormList>
        </AuthFormContainer>
    )
}

const AuthFormContainer = styled.div`
    margin: 0 auto;
    width: 500px;
    background-color: ${theme.white};
    border-radius: 27px;
    filter: drop-shadow(4px 4px 4px rgba(92, 92, 92, 0.25));
    padding: 25px 33px;
`

const AuthLabel = styled.h2`
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    color: ${theme.blue};
`

const AuthFormList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
`