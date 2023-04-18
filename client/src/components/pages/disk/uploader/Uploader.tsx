import React from 'react'
import { createPortal } from 'react-dom'

import { useAppSelector } from 'redux/store' 

import styled from 'styled-components'
import { theme } from 'assets/styles/constants'
import { CloseButton, Header, HeaderName } from '../commonStyle'

import { UploadFile } from './UploadFile'


type UploaderType = {
    onClose: () => void
}

export const Uploader: React.FC<UploaderType> = ({onClose}) => {

    const { files, isVisible } = useAppSelector(state => state.uploader)

    if(!isVisible) return null

    return createPortal(
        <UploaderConteiner>
            <Header>
                <HeaderName color = {theme.white}>Загрузка</HeaderName>
                <CloseButton color = {theme.white} onClick = {onClose}>X</CloseButton>
            </Header>
            <ul>
                {
                    files.map((el) => (
                        <UploadFile key = {el.id} file = {el}/>
                    ))
                }
            </ul>
        </UploaderConteiner>,
        document.getElementById("portal")!
    )
}

const UploaderConteiner = styled.div`
    width: 300px;
    height: 350px;
    padding: 10px;
    margin: 0 10px 10px 0;
    border-radius: 6px;
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: ${theme.blue};
    filter: drop-shadow(4px 4px 4px rgba(92, 92, 92, 0.25));
    overflow-y: auto;
`
