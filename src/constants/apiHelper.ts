import { AxiosError, AxiosRequestConfig } from "axios";
import axios from "../api/axios";
import { handleServiceError } from "./apiError";
export const getApi = async <TResponse,>(
    path: string,
    config?: AxiosRequestConfig
): Promise<TResponse> => {
    try {
        const response = await axios.get<TResponse>(path, config);
        return response.data;
    } catch (error) {
        return handleServiceError(error as AxiosError) as TResponse;
    }
};

export const postApi = async <TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: AxiosRequestConfig
): Promise<TResponse> => {
    try {
        const response = await axios.post<TResponse>(path, payload, config);
        return response.data;
    } catch (error) {
        return handleServiceError(error as AxiosError) as TResponse;
    }
};

export const putApi = async <TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: AxiosRequestConfig
): Promise<TResponse> => {
    try {
        const response = await axios.put<TResponse>(path, payload, config);
        return response.data;
    } catch (error) {
        return handleServiceError(error as AxiosError) as TResponse;
    }
};

export const deleteApi = async <TResponse,>(
    path: string
): Promise<TResponse> => {
    try {
        const response = await axios.delete<TResponse>(path);
        return response.data;
    } catch (error) {
        return handleServiceError(error as AxiosError) as TResponse;
    }
};
