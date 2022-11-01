
export interface IGetAllTask {
    name: string;
    type: number;
    isDeleted: boolean;
    billable?: boolean;
    id: number;

}

export interface ICreateTask {
    id?: number,
    name: string,
    type: number
}

export interface ITaskSaveRes {
    
    result: IGetAllTask,
    error: string
}

export interface ITaskRes {
    result: IGetAllTask[];
}

export interface IDeleteTaskRes {
    success: boolean;
    error: string;
}

export interface IDeArchiveTaskReq {
    id: number;
}