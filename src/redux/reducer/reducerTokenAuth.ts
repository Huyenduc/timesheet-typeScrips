import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../../interfaces/userType";
import { getAuthenticate } from "../action/TokenAuth";


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
            console.log(action.payload)
            // state.user.accessToken = action.payload?.result.accessToken;
        })
    }

})

export default tokenAuthSlice;