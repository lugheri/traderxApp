import { AppError } from '@utils/AppError';
import { BaseUrl } from '@utils/BaseUrl';
import axios from 'axios';
const api = axios.create({
  baseURL: BaseUrl
})

api.interceptors.response.use(response => {
    if(response.data.error){
      return Promise.reject(new AppError(response.data.message ? response.data.message : response.data.error))
    }
    return response
  }, error=>{
  
  if(error.response && error.response.data){
    return Promise.reject(new AppError(error.response.data.message ? error.response.data.message : error.response.data.error))
  } else{
    return Promise.reject(error)
  }
})

export { api };