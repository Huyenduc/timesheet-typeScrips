
interface ILogin {
    BASE_URL: string,
    LOGIN: string
}

export const BASE_URL: string = 'http://dev-api-timesheet.nccsoft.vn/api/'


export const LOGIN_API: ILogin = {
    BASE_URL,
    LOGIN: 'TokenAuth/Authenticate',
}

export const TASKS_API =  {
    BASE_URL,
    GET_TASK:'services/app/Task/GetAll',
    CREATE_TASK:'services/app/Task/Save',
    ARCHIVE_TASK:`services/app/Task/Archive`,
    DEARCHIVE_TASK:'services/app/Task/DeArchive',
    DELETE_TASK:'services/app/Task/Delete'

}

// export const PROJECTS_API = {
//     BASE_URL,
//     GET_ALL_PROJECTS:'services/app/Project/GetAll',
//     GET_ALL_CUSTOMER:'services/app/Customer/GetAll',
//     GET_QUANTILY_PROJECT:'services/app/Project/GetQuantityProject',
//     CREATE_PROJECT:'services/app/Project/Save',
//     DELETE_PROJECT:'services/app/Project/Delete',
//     GET_USER_NOT_PAGGING:'services/app/User/GetUserNotPagging',
//     CREATE_CLIENT:'services/app/Customer/Save',
//     GET_PROJECT:'services/app/Project/Get',
//     ACTIVE_PROJECT: 'services/app/Project/Active',
//     INACTIVE_PROJECT: 'services/app/Project/Inactive',
// }

