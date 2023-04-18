import React, { useEffect, useState, DragEvent } from 'react'

import { useAppDispatch, useAppSelector } from 'redux/store'
import { getFiles, uploadFile } from 'redux/file/asyncActions'
import { popDirStack } from 'redux/file/fileSlice'
import { clearUploader, setVisibility } from 'redux/uploader/uploaderSlice'

import styled from 'styled-components'
import { MainContainer, flex, theme } from 'assets/styles/constants'

import backButtonArrow from 'assets/img/backButtonArrow.svg'

import { FileBlock } from 'components/pages/disk/FileBlock'
import { Modal } from 'components/pages/disk/Modal'
import { Uploader } from 'components/pages/disk/uploader/Uploader'
import { SortBar } from 'components/pages/disk/SortBar'
import { ImageButton } from 'components/ui/disk/ImageButton'
import { UploadButton } from 'components/ui/disk/UploadButton'


export const DiskPage: React.FC = () => {

  const dispatch = useAppDispatch()

  const { currentDir, files, dirStack } = useAppSelector(state => state.file)
  const { isVisible } = useAppSelector(state => state.uploader)

  const [sort, setSort] = useState("name")
  const [isOpen, setIsOpen] = useState(false)
  const [dragEnter, setDragEnter] = useState(false)

  useEffect(() => {
    dispatch(getFiles({dirId: currentDir, sort}))
  }, [currentDir, sort])

  const handleBackClick = () => {
    dispatch(popDirStack())
  }

  const handleCloseUploader = () => {
    dispatch(setVisibility(!isVisible))
    dispatch(clearUploader())
  }

  const dragEnterHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setDragEnter(true)
  }

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setDragEnter(false)
  }

  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const files = [...e.dataTransfer.files]
    files.forEach(file => dispatch(uploadFile({file, dirId: currentDir})))

    setDragEnter(false)
  }

  return (
    <>
      {
        !dragEnter ?
        <DiskPageContainer 
          onDragEnter = {dragEnterHandler} 
          onDragLeave = {dragLeaveHandler} 
          onDragOver = {dragEnterHandler}
        >

          <MainContainer>

            <DirName>Directory</DirName>

            <Menu>

              <NavMenu>
                {
                  dirStack.length !== 0 &&
                  <ImageButton image = {backButtonArrow} onClick = {() => handleBackClick()} />
                }
              </NavMenu>

              <CreateMenu>
                <CreateButton onClick = {() => setIsOpen(true)}>Создать новую папку</CreateButton>
                <UploadButton />
              </CreateMenu>

              <SortBar 
                sort = {sort}
                onChange = {(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)}
              />

            </Menu>

            <DirContent>
              <Labels>
                <NameLabel>Название</NameLabel>
                
                <DateLabel>Дата</DateLabel>
                <SizeLabel>Размер</SizeLabel>
                <DeleteLabel />
              </Labels>

              <ul>
                {
                  files &&
                  files.map((el, i) => (
                    <FileBlock key = {i} info = {el} />
                  ))
                }
              </ul>
            </DirContent>

          </MainContainer>

        </DiskPageContainer>
        :
        <UploadSector 
          onDragEnter = {dragEnterHandler} 
          onDragLeave = {dragLeaveHandler} 
          onDragOver = {dragEnterHandler}
          onDrop = {dropHandler}
        >
          Перетащите файлы сюда
        </UploadSector>
      }

      <Modal 
        isOpen = {isOpen}
        onClose = {() => setIsOpen(false)}
      />
      <Uploader 
        onClose = {() => handleCloseUploader()}
      />
    </>
  )
}


const DiskPageContainer = styled.div`
  width: 100%;
  height: 100%;
`

const DirName = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: ${theme.blue}
`

const Menu = styled.div`
  display: flex;
  flex-direction: column;
`

const NavMenu = styled.div`
  height: 30px;
`

const CreateMenu = styled.div`
  ${flex}
  width: 260px;
  margin-top: 18px;
`

const CreateButton = styled.button`
  max-width: 168px;
  padding: 10px 4px;
  background-color: inherit;
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

const DirContent = styled.div`
  margin-top: 25px;
`

const Labels = styled.div`
  ${flex}
  border-bottom: 2px solid ${theme.blue};
`

const LabelStyle: string = `
  font-size: 14px;
  color: ${theme.blue};
  padding-bottom: 5px;
`

const NameLabel = styled.p`
  ${LabelStyle}
  flex-basis: 70%;
  margin-left: 106px;
`

const DateLabel = styled.p`
  ${LabelStyle}
  flex-basis: 10%;
  text-align: center;
`

const SizeLabel = styled.p`
  ${LabelStyle}
  flex-basis: 10%;
  text-align: center;
`

const DeleteLabel = styled.p`
  ${LabelStyle}
  flex-basis: 10%;
  text-align: center;
`

const UploadSector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: calc(100vh - 90px);
  margin: 0 auto;
  border: 2px dashed ${theme.blue};
  font-size: 30px;
  color: ${theme.blue};
`