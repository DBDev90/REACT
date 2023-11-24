import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./Interceptors";

const Api = axios.create({
    baseURL: 'http://localhost:3333'
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error)
);