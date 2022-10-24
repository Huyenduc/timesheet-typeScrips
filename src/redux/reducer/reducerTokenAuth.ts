import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../../interfaces/userType";
import { getAuthenticate } from "../action/TokenAuth";
import appConstants from "../../constants/appConstants";


const initialState: IAuthState = {
    progress: "",
    user: {
        accessToken: ""
    }
};
const tokenAuthSlice = createSlice({
    name: "tokenAuth",
    initialState,
    reducers:{
        restProgress (state) {
            state.progress = ""
        },
    },
    extraReducers : (builder) =>{
        builder.addCase(getAuthenticate.pending, (state) =>{
            state.progress = "pending"
        });
        builder.addCase(getAuthenticate.fulfilled, (state, action) =>{
            state.progress = "done"
            if(action.payload.data?.success === true){
                localStorage.setItem(appConstants.USER_TOKEN, action.payload.data?.result.accessToken)
            }
            else{
                console.log(action.payload.data?.error)
            }
            // state.user.accessToken = action.payload?.result.accessToken;
        })
    }

})

export default tokenAuthSlice;