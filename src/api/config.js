import axios from "axios";
import { clearData, refreshToken } from "./auth";

export const SERVER_URL ='https://futurepay-backend.onrender.com' 
//export const SERVER_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'http://nodepay.herokuapp.com'

export default function init(logoutCallback){
  axios.defaults.baseURL = SERVER_URL
  
  axios.defaults.withCredentials = false
  
  /*
  axios.interceptors.request.use(
    async config => {
      config.headers = { 
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      return config;
    },
    error => {
      Promise.reject(error)
  });*/
  
  axios.interceptors.response.use((response) => {
    return response
  }, async function (error) {
    const originalRequest = error.config;
    if (error?.response?.status === 403) {
      const response = error.response.data?.error
      const message = response?.split(' ', 1)[0]
      if(originalRequest._retry){
        clearData()
        logoutCallback()
      }
      if (message === 'invalid' && !originalRequest._retry) {
        originalRequest._retry = true;
        const token = await refreshToken();
        originalRequest.headers.Authorization = 'Bearer ' + token;
        return axios(originalRequest);
  
      }
    }
    return Promise.reject(error);
  })

}
