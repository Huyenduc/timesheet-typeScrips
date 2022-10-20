import axios from "./axios";
import { handleServiceError } from "../constants/apiError";
import { LOGIN_API } from "./endpoint";
import { IUserForm, IAuthRes } from "../interfaces/userType";

const getLogin = async ({ userNameOrEmailAddress, password, rememberClient }: IUserForm) => {
    try {
        const res = await axios.post<IUserForm, IAuthRes>(LOGIN_API.LOGIN, {
            userNameOrEmailAddress,
            password,
            rememberClient
        });
        return res;
        
    } catch (error) {
        return handleServiceError(error)
    }

}

export default getLogin;