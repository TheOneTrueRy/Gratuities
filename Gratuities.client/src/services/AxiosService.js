import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const QR_api = Axios.create({
  baseURL: 'https://api.qr-code-generator.com/v1/create?access-token=YQapgN3As7-NiyeTweAfALw6Dlwn7jzaamaQPDuQhGVH8kb8aG6GwThg73DdZ-Ro',
  timeout: 8000,
  params: {
    image_format: "PNG",
    image_width: "500"
  }
})
