import React, { useCallback } from 'react'

import styled from "styled-components"
import { theme } from 'assets/styles/constants'

import { useAppDispatch, useAppSelector } from 'redux/store'
import { createDir, uploadFile } from 'redux/file/asyncActions'


type UploadButtonType = {
    // dirName: String,
    // onClear: () => void
}

export const UploadButton: React.FC<UploadButtonType> = ({
    // dirName,
    // onClear
}) => {

  const dispatch = useAppDispatch()

  const { currentDir } = useAppSelector(state => state.file)

  const handleUploadClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? [...e.target.files] : []
    files.forEach(file => dispatch(uploadFile({file, dirId: currentDir})))
  }


  return (
    <UploadButtonContainer>
        <Label htmlFor = "upload">Загрузить</Label>
        <Input
            id = "upload"
            type = "file"
            miltiple = {true}
            onChange = {(e: React.ChangeEvent<HTMLInputElement>) => handleUploadClick(e)}
        />
    </UploadButtonContainer>
  )
}


const UploadButtonContainer = styled.div`

`

const Label = styled.label`
    max-width: 100px;
    background-color: inherit;
    border: 1px dotted ${theme.blue};
    padding: 9px 4px;
    border-radius: 12px;
    color: ${theme.blue};
    cursor: pointer;

    :hover {
        opacity: 0.6;
    }
`

const Input = styled.input`
    display: none;
`
