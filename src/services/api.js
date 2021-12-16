import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://feedbackscontinuos-api.herokuapp.com',
  
})