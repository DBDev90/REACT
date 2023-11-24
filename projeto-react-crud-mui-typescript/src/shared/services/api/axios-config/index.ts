import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./Interceptors";
import { Enviroment } from "../../../environment";

const Api = axios.create({
    baseURL: Enviroment.URL_BASE
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error)
);

export { Api };