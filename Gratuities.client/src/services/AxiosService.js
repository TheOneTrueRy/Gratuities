import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const QR_api = Axios.create({
  baseURL: 'https://api.qrserver.com/v1/create-qr-code/',
  timeout: 8000
})
