import axios from "axios";

const portServer = 3001
const urlServer  = 'http://192.168.1.16'

export const api = axios.create({
	baseURL: `${urlServer}:${portServer}`
})