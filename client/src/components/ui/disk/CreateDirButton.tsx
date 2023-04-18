import React, { useCallback } from 'react'

import styled from "styled-components"
import { theme } from 'assets/styles/constants'

import { useAppDispatch, useAppSelector } from 'redux/store'
import { createDir } from 'redux/file/asyncActions'


type CreateDirButtonType = {
    children: string,
    dirName: String,
    onClear: () => void
}

export const CreateDirButton: React.FC<CreateDirButtonType> = ({
    children,
    dirName,
    onClear
}) => {

  const dispatch = useAppDispatch()

  const { currentDir } = useAppSelector(state => state.file)

  const handleClick = () => {
    dispatch(createDir({dirId: currentDir, name: dirName}))
    onClear()
  }


  return (
    <Button
        type = "button"
        onClick = {() => handleClick()}
    >
        {children}
    </Button>
  )
}

const Button = styled.button`
  max-width: 100px;
  background-color: ${theme.blue};
  padding: 5px;
  border-radius: 4px;
  color: ${theme.white};
  cursor: pointer;

  :hover {
      opacity: 0.9;
  }
`
