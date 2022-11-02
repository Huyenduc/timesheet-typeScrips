import { createAsyncThunk } from "@reduxjs/toolkit";

import getAllProject,{getQuantityProject, getAllCustome, createNewProject, getUserProject, createNewClient} from "../../api/projectApi";
import { IcreateClient, ICreateProject, IFilter } from "../../interfaces/projectType";

export const getProjects = createAsyncThunk(
    "Project/getAll",
    async ({ status, search }: IFilter) => {
        const res = await getAllProject({ status, search });
        return res;
    }
);

export const getQuantity = createAsyncThunk(
    "Project/getQuantity",
    async () => {
        const res = await getQuantityProject();
        return res;
    }
);

export const getCustome = createAsyncThunk(
    "Project/getCustome",
    async () => {
        const res = await getAllCustome();
        return res;
    }
);

export const getUser = createAsyncThunk(
    "Project/getUser",
    async () => {
        const res = await getUserProject();
        return res;
    }
);

export const createProject = createAsyncThunk(
    "Project/createProject",
    async ({ id, name, code, timeStart, timeEnd, note, isAllUserBelongTo, projectTargetUsers, projectType, status, customerId, tasks, users }:ICreateProject) => {
        const res = await createNewProject(
            {
                id,
                name,
                code,
                timeStart,
                timeEnd,
                note,
                projectType,
                projectTargetUsers,
                customerId,
                isAllUserBelongTo,
                status,
                tasks,
                users
            });
        return res;
    }
);

export const createClient = createAsyncThunk(
    "Project/createClient",
    async ({ name, code, address }:IcreateClient) => {
        const res = await createNewClient(
            {
                name,
                code,
                address
            }
        );
        return res;
    }
);

// export const deleteProject = createAsyncThunk(
//     "Project/deleteProject",
//     async (id) => {
//         const res = { ...(await deleteProjectApi(id)), id };
//         return res;
//     }
// );
// export const activeProject = createAsyncThunk(
//     "Project/activeProject",
//     async ({ id }) => {
//         const res = { ...(await activeProjects({ id })), id };
//         return res;
//     }
// );

// export const inactiveProject = createAsyncThunk(
//     "Project/inactiveProject",
//     async ({ id }) => {
//         const res = { ...(await inactiveProjects({ id })), id };
//         return res;
//     }
// );