import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserForm } from "../../interfaces/userType";
import getLogin from "../../api/loginApi";

export const getAuthenticate = createAsyncThunk(
    "Login/Authenticate",
   async ({ userNameOrEmailAddress, password , rememberClient}: IUserForm) => {
    const res ={... await getLogin({
        userNameOrEmailAddress,
        password,
        rememberClient
    })};
    return res;
   }
)