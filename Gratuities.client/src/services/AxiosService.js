import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const googleApi = Axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
  timeout: 5000,
  params: {  key: 'AIzaSyDxfmcE1E0XIqyw91FjWGp3-Ab4VyQEwVQ'  }
})

