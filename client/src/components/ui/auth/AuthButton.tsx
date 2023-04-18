import React from 'react'

import styled from "styled-components"
import { theme } from 'assets/styles/constants'

type AuthButtonType = {
    disabled: boolean,
    children: string,
    onClick: () => void
}


export const AuthButton: React.FC<AuthButtonType> = ({
    disabled,
    children,
    onClick
}) => {

  return (
    <Button
        type = "button"
        disabled={disabled || false}
        onClick = {onClick}
    >
        {children}
    </Button>
  )
}

const Button = styled.button`
    max-width: 200px;
    padding: 8px 30px;
    background-color: ${theme.blue};
    border-radius: 12px;
    color: ${theme.white};
    cursor: pointer;
`