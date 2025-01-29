import axios from "axios";

export const api = axios.create({
    baseURL: "https://even-4-api.onrender.com/api"
})