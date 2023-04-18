import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addFile, changeProgress, setVisibility } from "redux/uploader/uploaderSlice";
import { BaseFile, DirRequest, FileSortRequest, UploadRequest } from "types/file";


const FILE_URL = '/api/files'


export const getFiles = createAsyncThunk<BaseFile[], FileSortRequest>(
    "file/getFiles", 
    async ({dirId, sort}, thunkAPI) => {
        try {
            let url = `${process.env.REACT_APP_API_DOMAIN}${FILE_URL}`

            if (dirId) {
                url += `?parent=${dirId}`
            } else if (sort) {
                url += `?sort=${sort}`
            } else if (dirId && sort) {
                url += `?parent=${dirId}&sort=${sort}`
            }

            const response: any = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })

            return response.data
        } catch (error: any) {
            alert(error.response.data.message)
            return thunkAPI.rejectWithValue("Error");
        }
    }
)

export const createDir = createAsyncThunk<BaseFile, DirRequest>(
    "file/createDir", 
    async ({dirId, name}, thunkAPI) => {
        try {
            const response: any = await axios.post(`${process.env.REACT_APP_API_DOMAIN}${FILE_URL}`, 
            {
                name,
                parent: dirId,
                type: 'dir'
            },
            {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })

            return response.data
        } catch (error: any) {
            alert(error.response.data.message)
            return thunkAPI.rejectWithValue("Error");
        }
    }
)

export const uploadFile = createAsyncThunk<BaseFile, UploadRequest>(
    "file/uploadFile", 
    async ({file, dirId}, thunkAPI) => {
        try {
            const formData = new FormData()
            formData.append('file', file)

            if(dirId) formData.append('parent', dirId.toString())

            const uploadFile = {id: Date.now(), name: file.name, progress: 0}
            thunkAPI.dispatch(setVisibility(true))
            thunkAPI.dispatch(addFile(uploadFile))

            const response: any = await axios.post(`${process.env.REACT_APP_API_DOMAIN}${FILE_URL}/upload`,
            formData,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                onUploadProgress: (progressEvent: any) => {
                    const totalLength = progressEvent.event.lengthComputable 
                        ? progressEvent.total 
                        : progressEvent.event.target.getResponseHeader('content-length') || progressEvent.event.target.getResponseHeader('x-decompressed-content-length')

                    if (totalLength) {
                        thunkAPI.dispatch(changeProgress({
                            ...uploadFile, 
                            progress: Math.round((progressEvent.loaded * 100) / totalLength)
                        }))
                    }
                }
            })

            return response.data
        } catch (error: any) {
            alert(error.response.data.message)
            return thunkAPI.rejectWithValue("Error");
        }
    }
)

export const deleteFile = createAsyncThunk<String, BaseFile>(
    "file/deleteFile", 
    async (file, thunkAPI) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_DOMAIN}${FILE_URL}?id=${file._id}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
            })

            return file._id
        } catch (error: any) {
            alert(error.response.data.message)
            return thunkAPI.rejectWithValue("Error");
        }
    }
)

export const downloadFile = async (file: BaseFile) => {
    const response: any = await axios.get(`${process.env.REACT_APP_API_DOMAIN}${FILE_URL}/download?id=${file._id}`,
    {
        responseType: 'blob',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })

    if(response.status === 200) {
        const downloadUrl = window.URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = String(file.name)
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}