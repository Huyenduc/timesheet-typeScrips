
export interface IUserForm {
    userNameOrEmailAddress: string,
    password: string,
    rememberClient: boolean
}

export interface IAuthState {
    progress:string,
    user:{
        accessToken: string
    }
    
}