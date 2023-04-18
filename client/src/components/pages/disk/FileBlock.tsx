import React from 'react'

import styled from 'styled-components'

import { flex, theme } from 'assets/styles/constants'
import downloadSvg from 'assets/img/download.svg'
import deleteSvg from 'assets/img/delete.svg'
import dir from 'assets/img/dir.svg'
import file from 'assets/img/file.svg'

import { ImageButton } from 'components/ui/disk/ImageButton'

import { BaseFile } from 'types/file'
import { useAppDispatch } from 'redux/store'
import { pushDirStack, setCurrentDir } from 'redux/file/fileSlice'
import { deleteFile, downloadFile } from 'redux/file/asyncActions'
import sizeFormater from 'utils/sizeFormater'


type FileBlockType = {
    info: BaseFile
}


export const FileBlock: React.FC<FileBlockType> = ({info}) => {

    const dispatch = useAppDispatch()

    const openDirHandler = (file: BaseFile) => {
        if(file.type === "dir") {
            dispatch(pushDirStack(file._id))
            dispatch(setCurrentDir(file._id))
        }
    }

    const deleteHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        dispatch(deleteFile(info))
    }

    return (
        <FileBlockContainer onClick = {() => openDirHandler(info)}>
            <PrevImg src = {info.type === "dir" ? dir : file}/>
            <Name>{info.name}</Name>
            <Date>{info.date.slice(0, 10)}</Date>
            <Size>{sizeFormater((info.size).valueOf())}</Size>
            <Delete type = {info.type}>
                {
                    info.type !== "dir" &&
                    <ImageButton image = {downloadSvg} onClick={() => downloadFile(info)} />
                }
                <ImageButton image = {deleteSvg} onClick={(e: React.MouseEvent<HTMLElement>) => deleteHandler(e)}/>
            </Delete>
        </FileBlockContainer>
    )
}


const FileBlockContainer = styled.li`
    ${flex}
    justify-content: start;
    height: 70px;
    border-bottom: 2px solid ${theme.blue};
    text-decoration: none;
    cursor: pointer;
    :hover {
        transform: scale(1.01);
      }
`

const PrevImg = styled.img`
    padding: 0 31px 0 28px;
`

const TextStyle: string = `
    font-size: 14px;
    color: ${theme.blue};
    word-wrap: normal;
`

const Name = styled.p`
    flex-basis: 70%;
    ${TextStyle}
`

const Date = styled.p`
    flex-basis: 10%;
    ${TextStyle}
    text-align: center;
`

const Size = styled.p`
    flex-basis: 10%;
    ${TextStyle}
    text-align: center;
`

const Delete = styled.div`
    flex-basis: 10%;
    width: 100%;
    ${flex}
    justify-content: end;
    ${(props: {type: string}) => props.type !== "dir" &&`
      justify-content: space-between;
    `}
`


