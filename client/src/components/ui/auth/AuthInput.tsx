import React from 'react'

import styled from "styled-components"
import { theme } from 'assets/styles/constants'

type AuthInputType = {
    onChange: Function,
    placeholder: string,
    type: string
}


export const AuthInput: React.FC<AuthInputType> = ({
    onChange,
    placeholder,
    type
}) => {

  return (
    <Input
        type = {type}
        placeholder = {placeholder}
        onChange = {(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
    />
  )
}

const Input = styled.input`
    width: calc(100% - 10px);
    height: 30px;
    border: none;
    outline: none;
    border-bottom: 3px solid ${theme.blue};
    padding: 0 5px;
    margin: 10px 0;
    font-size: 16px;
    color: ${theme.blue};
    :placeholder {
        color: ${theme.gray};
    }
`