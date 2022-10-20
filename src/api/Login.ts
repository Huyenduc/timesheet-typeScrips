import axios from "./axios";
import { handleServiceError } from "../constants/apiError";
import { LOGIN_API } from "./endpoint";
import { IUserForm } from "../interfaces/userType";

const getLogin = async ({ userNameOrEmailAddress, password , rememberClient}: IUserForm ) => {
    try {
        const res = await axios.post(LOGIN_API.LOGIN, {
            userNameOrEmailAddress,
            password,
            rememberClient
        });
        return res;
    } catch (error ){
        return handleServiceError(error)
    }

}

export default getLogin;