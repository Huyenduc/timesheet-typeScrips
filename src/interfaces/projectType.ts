export interface IProject {
    customerName: string,
    name: string,
    code: string,
    status: number,
    pms: [
        string
    ],
    activeMember: 0,
    projectType: 0,
    timeStart: string,
    timeEnd: string,
    id: number
}

export interface IGetQuantity {
    status: number,
    quantity: number
}

export interface IGetCustomer {
    name: string,
    code?: string,
    id?: number
}

export interface ITasks {
    taskId: number,
    billable: boolean,
    id: number,
}

export interface IUsers {
    userId: number,
    type: number,
    id: number,
}

export interface ICreateProject {
    name: string,
    code: string,
    status: number,
    timeStart: string|null,
    timeEnd?: string|null,
    note: string,
    projectType: number,
    customerId: number|string,
    tasks: ITasks[],
    users: IUsers[],
    projectTargetUsers?: [
        {
            userId: number,
            roleName: string,
            id: number,
        },
    ],
    isAllUserBelongTo: boolean,
    id: number,
}

export interface IGetUserNotPagging {
    branchId?:number|string
    name: string;
    isActive: boolean;
    type: number;
    jobTitle: string;
    level: number;
    userCode: string;
    avatarPath: string;
    branch: number;
    id: number;
    projectType?: number;
    emailAddress:string
}

export interface IcreateClient {
    name:string,
    code:string,
    address:string
}


export interface IGetCustomerRes {
    result: IGetCustomer[];
}

export interface IGetQuantityRes {
    result: IGetQuantity[];

}

export interface IProjectRes {
    result: IProject[];
}

export interface ICreateProjectRes {
    status: number
    result: ICreateProject,
    error: string
}

export interface IGetUserNotPaggingRes {
    result: IGetUserNotPagging[]
}
export interface IcreateClientRes {
    success: boolean
    result: IcreateClient,
    error: string
}
export interface IFilter {
    status?: number,
    search?: string
}