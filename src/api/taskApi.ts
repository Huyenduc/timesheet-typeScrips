import { deleteApi, getApi, postApi } from "../constants/apiHelper";
import { TASKS_API } from "./endpoint";
import { ICreateTask, ITaskRes, IDeleteTaskRes, ITaskSaveRes, IDeArchiveTaskReq } from "../interfaces/tasksType"

const getTaskApi = async () => {
    const response = await getApi<ITaskRes>(TASKS_API.GET_TASK)
    return response;
}

export const createTaskApi = async ({ id, name, type }: ICreateTask) => {
    const createTask = await postApi<ICreateTask, ITaskSaveRes>(TASKS_API.CREATE_TASK, {
        id,
        name,
        type,
    });
    return createTask;
}

export const archiveTaskApi = async (id: number) => {
    const archiveTask = await deleteApi<IDeleteTaskRes>(`${TASKS_API.ARCHIVE_TASK}?Id=${id}`);
    return archiveTask;

}

export const deArchiveTaskApi = async ({ id }: IDeArchiveTaskReq) => {

    const dearchiveTask = await postApi<IDeArchiveTaskReq, IDeleteTaskRes>(TASKS_API.DEARCHIVE_TASK, { id });
    return dearchiveTask;
}

export const deleteTaskApi = async (id: number) => {

    const deleteTask = await deleteApi<IDeleteTaskRes>(`${TASKS_API.DELETE_TASK}?Id=${id}`);
    return deleteTask;

}

export default getTaskApi;