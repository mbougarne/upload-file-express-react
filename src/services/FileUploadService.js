 
import http from './http'

export const uploadFile = (file, onUploadProgress) => {

    let formData = new FormData()

    formData.append('document', file)

    return http.post('/uploads', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress
    })
}

export const fetchFiles = () => http.get('/uploads')