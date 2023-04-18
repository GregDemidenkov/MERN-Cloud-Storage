import React from 'react'

import styled from "styled-components"
import { theme } from 'assets/styles/constants'


type ImageButtonType = {
  image: any,
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

export const ImageButton: React.FC<ImageButtonType> = ({
  image,
  onClick
}) => {
  return (
    <Button
        type = "button"
        image = {image}
        onClick = {onClick}
    />
  )
}

const Button = styled.button`
    width: 55px;
    padding: 16px 4px;
    background-color: inherit;
    ${(props: {image: any}) => props.image &&`
      background-image: url(${props.image});
    `}
    background-repeat: no-repeat;
    background-position: center;
    border: 1px solid ${theme.blue};
    border-radius: 14px;
    font-size: 14px;
    color: ${theme.blue};
    cursor: pointer;

    :hover {
      opacity: 0.6;
    }

    :focus {
      border: 1px solid ${theme.blue};
    }
`
