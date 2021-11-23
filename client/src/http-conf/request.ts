import axios from 'axios'

export const SERVER_URL = 'http://127.0.0.1:8000/'
export const endpoints = {
    metadata: 'set-token-metadata/',
    algorithmConfig: 'set-algorithm-config/',
    createAssets: 'create-assets/',
    getSetup: 'get-setup/'
}

const request = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true
})


export default request