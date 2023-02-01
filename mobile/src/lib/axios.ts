import axios from "axios"

export const api = axios.create({
  // baseURL: "http://localhost:4000"
  baseURL: "http://192.168.15.21:4000"
})