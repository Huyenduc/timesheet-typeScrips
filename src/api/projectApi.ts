import { getApi, postApi, deleteApi } from "../constants/apiHelper";
import { PROJECTS_API } from "../api/endpoint";
import { IFilter, IProjectRes, IGetQuantityRes, IGetCustomerRes, ICreateProject, ICreateProjectRes, IGetUserNotPaggingRes, IcreateClient, IcreateClientRes } from "../interfaces/projectType";

const getAllProject = async ({ status, search }: IFilter) => {
    if (typeof status === 'number') {
        let res = await getApi<IProjectRes>(`${PROJECTS_API.GET_ALL_PROJECTS}?status=${status}&search=${search}`);

        return res;
    } else {
        let res = await getApi<IProjectRes>(`${PROJECTS_API.GET_ALL_PROJECTS}?&search=${search}`);
        return res;
    }
};

export const getAllCustome = async () => {
    const res = await getApi<IGetCustomerRes>(PROJECTS_API.GET_ALL_CUSTOMER);
    return res

}

export const getQuantityProject = async () => {
    const res = await getApi<IGetQuantityRes>(PROJECTS_API.GET_QUANTILY_PROJECT);
    return res;

}

export const createNewProject = async ({
    id, name, code, timeStart, timeEnd, note, isAllUserBelongTo, projectTargetUsers, projectType, status, customerId, tasks, users
}: ICreateProject) => {

    const res = await postApi<ICreateProject, ICreateProjectRes>(PROJECTS_API.CREATE_PROJECT,
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


export const getUserProject = async () => {
        const res = await getApi<IGetUserNotPaggingRes>(PROJECTS_API.GET_USER_NOT_PAGGING);
        return res;
   
}

export const createNewClient = async ({ name, code, address }:IcreateClient) => {
        const res = await postApi<IcreateClient,IcreateClientRes>(PROJECTS_API.CREATE_CLIENT, {
            name,
            code,
            address
        });
        return res;
}

// export const deleteProjectApi = async (id) => {
//     try {
//         const res = await axios.delete(`${PROJECTS_API.DELETE_PROJECT}?Id=${id}`);
//         return res;
//     }
//     catch (error) {
//         console.log(error.response.data.error.message)
//         return handleServiceError(error);
//     }
// };

// export const activeProjects = async ({ id }) => {
//     try {
//         const res = await axios.post(PROJECTS_API.ACTIVE_PROJECT, { id });
//         return res.data
//     } catch (error) {
//         return handleServiceError(error);

//     }
// };

// export const inactiveProjects = async ({ id }) => {
//     try {
//         const res = await axios.post(PROJECTS_API.INACTIVE_PROJECT, { id });
//         return res.data
//     } catch (error) {
//         return handleServiceError(error);
//     }
// };

export default getAllProject;