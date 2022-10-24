import { configureStore } from "@reduxjs/toolkit";

import taskSlice from "./reducer/reducerTask";
// import projectSlice from "./reducer/projectReducer";

import tokenAuthSlice from "./reducer/reducerTokenAuth";

const store = configureStore({
    reducer: {
        tokenAuth:tokenAuthSlice.reducer,
        task: taskSlice.reducer,
        // project: projectSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;