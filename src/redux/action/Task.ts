import { createAsyncThunk } from "@reduxjs/toolkit";
import {ICreateTask} from "../../interfaces/tasksType"
import getTaskApi, { createTaskApi, archiveTaskApi, deArchiveTaskApi, deleteTaskApi } from "../../api/taskApi";


export const getTask = createAsyncThunk(
    "/services/app/Task/GetAll",
    async () => {
        const response = await getTaskApi();
        return response;
    }
);

export const createTask = createAsyncThunk(
    "services/app/Task/Save",
    async ({ id, name, type } : ICreateTask) => {
        const create = await createTaskApi({
            id,
            name,
            type
        })
        return create ;
    }
);

export const archiveTask = createAsyncThunk(
    "/Task/Archive",
    async (id:number) => {
        const archive = { ...(await archiveTaskApi(id)), id };
        return archive;
    }
)

export const deArchiveTask = createAsyncThunk(
    "/Task/DeArchive",
    async (id: number) => {
        const deArchive = { ...(await deArchiveTaskApi({id})), id };
        return deArchive;
    }
)

export const deletetask = createAsyncThunk(
    "/Task/Delete",
    async (id:number) => {
        const deleteTask = { ...(await deleteTaskApi(id)), id };
        return deleteTask;
    }
)