import React from 'react'

import { useAppDispatch } from 'redux/store'
import { removeFile } from 'redux/uploader/uploaderSlice'

import styled from 'styled-components'
import { theme } from 'assets/styles/constants'
import { CloseButton, Header, HeaderName } from '../commonStyle'


type UploadFileType = {
    file: {id: number, name: string, progress: number}
}

export const UploadFile: React.FC<UploadFileType> = ({file}) => {

    const dispatch = useAppDispatch()

    return (
        <UploadFileContainer>
            <Header>
                <HeaderName color = {theme.blue}>{file.name}</HeaderName>
                <CloseButton color = {theme.blue} onClick = {() => dispatch(removeFile(file.id))}>X</CloseButton>
            </Header>
            <ProgressBar>
                <Progress width = {file.progress}/>
                <Percent>{file.progress}%</Percent>
            </ProgressBar>
        </UploadFileContainer>
    )
}

const UploadFileContainer = styled.div`
    background-color: ${theme.white};
    padding: 5px 5px 2px;
    border-radius: 4px;
    font-size: 11px;
    margin-bottom: 5px; 

    :first-child {margin-top: 30px;}

    button {
        font-size: 10px;
        border: none;
        padding: 0;
    }

    & > div {
        margin-bottom: 5px;;
    }
`

const ProgressBar = styled.div`
    display: flex;
    height: 12px;
    border-radius: 8px;
    background-color: ${theme.blue};
`

const Progress = styled.div`
    ${(props: {width: number}) => props.width &&`
        width: ${props.width}%;
    `}
    border-radius: 8px;
    background-color: green;
`

const Percent = styled.p`
    position: absolute;
    left: 50%;
    color: ${theme.white};
    font-size: 10px;
    padding-top: 0.5px;
`