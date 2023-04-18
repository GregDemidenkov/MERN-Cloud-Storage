export interface BaseUser {
    email: String,
    password: String
}

export interface ShowUser {
    id: String,
    email: String,
    diskSpace: Number,
    usedSpace: Number,
    avatar: String
}

export interface LoginResponse {
    token: string,
    user: ShowUser 
}

