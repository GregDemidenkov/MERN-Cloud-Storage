import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import { BaseUser, LoginResponse, ShowUser } from "types/user";


const AUTH_URL = '/api/auth'


export const registartion = createAsyncThunk<String, BaseUser>(
    "user/registration", 
    async ({email, password}, thunkAPI) => {
        try {
            const response: any = await axios.post(`${process.env.REACT_APP_API_DOMAIN}${AUTH_URL}/registration`, {
                email,
                password
            })

            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue("Error");
        }
    }
)

export const login = createAsyncThunk<LoginResponse, BaseUser>(
    "user/login", 
    async ({email, password}, thunkAPI) => {
        try {
            const response: any = await axios.post(`${process.env.REACT_APP_API_DOMAIN}${AUTH_URL}/login`, {
                email,
                password
            })

            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue("Error");
        }
    }
)

export const auth = createAsyncThunk<LoginResponse>(
    "user/auth", 
    async (_, thunkAPI) => {
        try {
            const response: any = await axios.get(`${process.env.REACT_APP_API_DOMAIN}${AUTH_URL}/auth`, 
                {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
            )
            localStorage.setItem("token", response.data.token)

            return response.data
        } catch (error: any) {
            localStorage.removeItem("token")
            
            return thunkAPI.rejectWithValue("Error");
        }
    }
)
