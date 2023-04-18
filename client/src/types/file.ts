export interface BaseFile {
    _id: String,
    name: String,
    type: String,
    accessLink: String,
    size: Number,
    path: String,
    date: String,
    user: String,
    parent: String | null,
    childs: String[],
}

export interface FileRequest {
    dirId: String | null
}

export interface DirRequest extends FileRequest {
    name: String
}

export interface UploadRequest extends FileRequest {
    file: File
}

export interface DownloadRequest {
    file: File
}

export interface FileSortRequest extends FileRequest {
    sort: string
}
