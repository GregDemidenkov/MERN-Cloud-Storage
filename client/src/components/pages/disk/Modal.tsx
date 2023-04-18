import React, { useState } from 'react'
import { createPortal } from 'react-dom'

import styled from 'styled-components'
import { theme } from 'assets/styles/constants'
import { CloseButton, Header, HeaderName,  } from './commonStyle'
import { CreateDirButton } from 'components/ui/disk/CreateDirButton'


type ModalType = {
    isOpen: boolean,
    onClose: () => void
}

export const Modal: React.FC<ModalType> = ({isOpen, onClose}) => {

    const [dirName, setDirName] = useState("")

    if(!isOpen) return null

    return createPortal(
        <>
            <Overlay onClick = {onClose}/>
            <ModalContainer>
                <Header>
                    <HeaderName color = {theme.blue}>Создать новую папку</HeaderName>
                    <CloseButton color = {theme.blue} onClick = {onClose}>X</CloseButton>
                </Header>
                <Input 
                    placeholder = "Введите название папки..."
                    value = {dirName}
                    onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setDirName(e.target.value)}
                />
                <CreateDirButton dirName = {dirName} onClear = {() => setDirName("")}>Создать</CreateDirButton>
            </ModalContainer>
        </>,
        document.getElementById("portal")!
    )
}


const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    padding: 18px;
    border-radius: 12px;
    background-color: ${theme.white};
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: end;
`

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .7);
    z-index: 1000;
`

const Input = styled.input`
    width: calc(100% - 10px);
    height: 30px;
    border: none;
    outline: none;
    border-bottom: 3px solid ${theme.blue};
    padding: 0 5px;
    margin: 20px 0;
    font-size: 16px;
    color: ${theme.blue};
    :placeholder {
        color: ${theme.gray};
    }
`
