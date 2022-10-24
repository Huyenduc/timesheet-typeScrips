import axios from "./axios";
import { TASKS_API } from "./endpoint";
import { ICreateTask, ITaskRes, IDeleteTaskRes } from "../interfaces/tasksType"
import { handleServiceError } from "../constants/apiError";

export interface IDataError {
    error?: string;
    Error?: string;
  }

const getTaskApi = async () => {
    try {
        const response = await axios.get(TASKS_API.GET_TASK)
        return response.data
    }
    catch (error) {
        handleServiceError(error)
    }
}

export const createTaskApi = async ({ id, name, type }: ICreateTask) => {
    try {

        const createTask = await axios.post<ICreateTask, ITaskRes >(TASKS_API.CREATE_TASK, {
            id,
            name,
            type,
        });
        return createTask;
    }
    catch (error) {
        handleServiceError(error)
    }
}

export const archiveTaskApi = async (id: number) => {
    try {
        const archiveTask = await axios.delete<IDeleteTaskRes> (`${TASKS_API.ARCHIVE_TASK}?Id=${id}`);
        return archiveTask;

    }
    catch (error) {
        console.log(handleServiceError(error))

        handleServiceError(error)
    }
}

export const deArchiveTaskApi = async (id: number) => {
    try {
        const dearchiveTaskApi = await axios.post  (TASKS_API.DEARCHIVE_TASK, { id });
        return dearchiveTaskApi;
    }
    catch (error) {
        handleServiceError(error)
    }
}

export const deleteTaskApi = async (id: number) => {
    try {
        const deleteTask = await axios.delete <IDeleteTaskRes> (`${TASKS_API.DELETE_TASK}?Id=${id}`);
        return deleteTask;
    }
    catch (error) {
        handleServiceError(error)
    }
}

export default getTaskApi;