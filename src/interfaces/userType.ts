
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



export interface IAuthRes {
        result: {
            accessToken: string;
            encryptedAccessToken: string;
            expireInSeconds: number;
            userId: number;
          },
   
    // error: IError;
    success: boolean;
  }