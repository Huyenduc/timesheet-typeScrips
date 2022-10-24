
export interface IGetAllTask {
    name: string;
    type?: number;
    isDeleted: boolean;
    billable?: boolean;
    id: number;

}

export interface ICreateTask {
    id?: number,
    name: string,
    type: number
}


export interface ITaskRes {
    data: {
        result: IGetAllTask;
        error?:string
    }
}

export interface IDeleteTaskRes {
    success: boolean;
    error: string;
  }