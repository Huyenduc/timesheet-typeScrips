import { createSlice } from "@reduxjs/toolkit"
import { getTask, createTask, archiveTask, deArchiveTask, deletetask } from "../action/Task"
import { createSelector } from "reselect";
import { IGetAllTask } from '../../interfaces/tasksType';
import { RootState } from "../store";

interface TaskState {
    tasks: IGetAllTask[],
    progress: string,
    success: boolean,
    searchName: string,
    error: string,
    messenger:string
    idError: string
}

const initialState: TaskState = {
    tasks: [],
    progress: "",
    success: false,
    searchName: "",
    error: "",
    idError: "",
    messenger:""
}
const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setSearchName: (state, action) => {
            state.searchName = action.payload.searchName;
        },
        resetProgress(state) {
            state.progress = "";
        },
        resetSuccess(state) {
            state.success = false;
        },
        resetError(state) {
            state.error = "";
        },
        resetIdError(state) {
            state.idError = "";
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getTask.fulfilled, (state, action) => {
            state.tasks = action.payload.result;
        });

        //Status Pending
        builder.addCase(createTask.pending, (state) => {
            state.progress = "pending"
        });
        builder.addCase(archiveTask.pending, (state) => {
            state.progress = "pending"
        });
        builder.addCase(deArchiveTask.pending, (state) => {
            state.progress = "pending"
        });
        builder.addCase(deletetask.pending, (state) => {
            state.progress = "pending"
        })

        //Status Fulfilled
        builder.addCase(createTask.fulfilled, (state, action) => {
            try {
                state.progress = "done";
                state.idError = "CreateTask"
                const findTask = state.tasks.find(
                    (task) => task.id === action.payload?.result.id
                );
                if (findTask) {
                    state.tasks = state.tasks.map((task) => {
                        if (task.id === action.payload?.result.id) {
                            task.name = action.payload?.result.name;
                            task.type = action.payload?.result.type;
                        }
                        return task;
                    });
                } else {
                    state.tasks.push(action.payload?.result);
                }
            } catch {
                state.progress = "error";
                // console.log(action.payload.error)
                state.error = action.payload.error
                
            }
        });
        builder.addCase(archiveTask.fulfilled, (state, action) => {
            state.progress = "Ardone";
            if (action.payload.success == true) {

                state.tasks = state.tasks.map((task) => {
                    if (task.id === action.payload.id) {
                        task.isDeleted = true;
                    }
                    return task;
                });

            } else {
                state.progress = "error";

                state.error = action.payload.error
            }
        });
        builder.addCase(deArchiveTask.fulfilled, (state, action) => {
            state.progress = "Dedone";
            if (action.payload.success == true) {
                state.tasks = state.tasks.map((task) => {
                    if (task.id === action.payload.id) {
                        task.isDeleted = false;
                    }
                    return task;
                })
            } else {
                state.progress = "error";
                state.error = action.payload.error;

            }
        });
        builder.addCase(deletetask.fulfilled, (state, action) => {
            state.progress = "Deletedone";
            if (action.payload.success == true) {
                state.tasks = state.tasks.filter((item) => item.id !== action.payload.id)
            } else {
                state.progress = "error";
                state.error = action.payload.error;
            }
        })

        //Status Rejected
        builder.addCase(createTask.rejected, (state, action) => {
            state.progress = "error";
        });
        builder.addCase(archiveTask.rejected, (state, action) => {
            state.progress = "error";
        });

    }
})
const selectSelf = (state:RootState) => state.task;
export const getAllTaskSelector = createSelector(
    selectSelf,
    (state) => state.tasks
);

export const getCommonTaskSelector = createSelector(
    getAllTaskSelector,
    (tasks) => tasks.filter((task) => task.type === 0)
);

export const getOtherTaskSelector = createSelector(
    getAllTaskSelector,
    (tasks) => tasks.filter((task) => task.type === 1)
);

export const { resetProgress, resetSuccess, setSearchName, resetIdError } =
    taskSlice.actions;

export default taskSlice;