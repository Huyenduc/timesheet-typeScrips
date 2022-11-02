import { createSlice } from "@reduxjs/toolkit";
import {
    getProjects, getQuantity,
    getCustome,
     getUser,
    createProject,
    createClient, 
    // getItemProject, deleteProject, activeProject, inactiveProject
} from "../action/Project";
import { getTask } from '../action/Task'
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProject, IGetQuantity, IGetCustomer, ICreateProject,IGetUserNotPagging } from "../../interfaces/projectType";
import { IGetAllTask } from "../../interfaces/tasksType";


interface ProjectState {
    projects: IProject[],
    quantitys: IGetQuantity[],
    progaress: string,
    customes: IGetCustomer[],
    createProject: ICreateProject[],
    project: ICreateProject,
    users:IGetUserNotPagging [],
    listMembers:IGetUserNotPagging [],
    selectedMembers:IGetUserNotPagging [],

    tasks:IGetAllTask [],
    listTasks:IGetAllTask [],
    selectedTasks:IGetAllTask [],
    message: string,

}

const initialState: ProjectState = {
    projects: [],
    createProject: [],
    project: {
        name: "",
        code: "",
        status: 0,
        timeStart: "",
        timeEnd: "",
        note: "",
        projectType: 0,
        customerId: 0,
        tasks: [
            {
                taskId: 0,
                billable: true,
                id: 0,
            },
        ],
        users: [
            {
                userId: 0,
                type: 0,
                id: 0,
            },
        ],
        projectTargetUsers: [
            {
                userId: 0,
                roleName: "",
                id: 0,
            },
        ],
        isAllUserBelongTo: false,
        id: 0,
    },
    customes: [],
    quantitys: [],
    users: [],
    tasks: [],
    listTasks: [],
    listMembers: [],
    // general: [],
    selectedMembers: [],
    selectedTasks: [],
    progaress: "",
    message: "",
}

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        resetProgress: (state) => {
            state.progaress = "";
        },
        resetSelectedMembers: (state) => {
            state.selectedMembers = [];
        },
        pushMembers: (state, action) => {

            state.selectedMembers.push(action.payload);
            state.listMembers = state.listMembers.filter((item) => item.id !== action.payload.id);
            console.log(state.selectedMembers)
        },
        removeMembers: (state, action) => {
            console.log(action)
            state.selectedMembers = state.selectedMembers.filter((item) => item.id !== action.payload.id);
            state.listMembers.push(action.payload);
        },
        updateMemberType: (state, action) => {
            state.selectedMembers = state.selectedMembers.map((member) => {
                if (member.id === action.payload.id) {
                    member.projectType = action.payload.type;
                }
                return member;
            });
        },
        pushTasks: (state, action) => {
            state.selectedTasks.push(action.payload);
            state.listTasks = state.listTasks.filter((item) => item.id !== action.payload.id);
        },
        removeTask: (state, action) => {
            state.selectedTasks = state.selectedTasks.filter((item) => item.id !== action.payload.id);
            state.listTasks.push(action.payload);
        },
        updateBillable: (state, action) => {
            state.selectedTasks = state.selectedTasks.map((task) => {
                if (task.id === action.payload.id) {
                    task.billable = action.payload.billable;
                }
                return task;
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProjects.fulfilled, (state, action) => {
            state.projects = action.payload.result;
            // console.log(state.projects);
        });
        // builder.addCase(getItemProject.fulfilled, (state, action) => {
        //     state.project = action.payload.result;
        // })
        builder.addCase(getQuantity.fulfilled, (state, action) => {
            state.quantitys = action.payload.result;
        });
        builder.addCase(getCustome.fulfilled, (state, action) => {
            state.customes = action.payload.result;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.listMembers = action.payload.result;
            state.users = action.payload.result;
        });
        builder.addCase(getTask.fulfilled, (state, action) => {
            state.tasks = action.payload.result;
            state.selectedTasks = state.tasks.filter((item) => item.type == 0);
            state.listTasks = state.tasks.filter((item) => item.type == 1);
        });

        builder.addCase(createProject.pending, (state) => {
            state.progaress = "pending"
        });
        builder.addCase(createProject.fulfilled, (state, action) => {

            if (action.payload.status === 200) {
                state.progaress = "ok";
                if (state.createProject.find((project) => project.id === action.payload.result.id)) {
                    state.createProject = state.createProject.map((project) => {
                        if (project.id === action.payload.result.id) {
                            project.customerId = action.payload.result.customerId;
                            project.name = action.payload.result.name;
                            project.code = action.payload.result.code;
                            project.timeStart = action.payload.result.timeStart;
                            project.timeEnd = action.payload.result.timeEnd;
                            project.note = action.payload.result.note;
                            project.isAllUserBelongTo = action.payload.result.isAllUserBelongTo;
                            project.projectType = action.payload.result.projectType;
                            project.users = action.payload.result.users;
                            project.tasks = action.payload.result.tasks;
                        }
                        return project;
                    });
                } else {
                    state.createProject.push(action.payload.result);
                }
            } else {
                state.progaress = "errors";
                state.message = action.payload.error;
            }


            // let pushP = [];
            // const data = [action.payload.data.result];
            // console.log(data)
            // data.forEach((item) => {
            //     pushP.push({
            //         name: item.name,
            //         code: item.code,
            //         // users:[]

            //     })
            // })


        });
        builder.addCase(createProject.rejected, (state, action) => {
            state.progaress = "error";
            // state.message = action.payload?.error;
        });



        builder.addCase(createClient.pending, (state, action) => {
            state.progaress = "pending"
        });
        builder.addCase(createClient.fulfilled, (state, action) => {
           console.log(action.payload.success)
            if (action.payload.success === true) {
                state.progaress = "done";
                state.customes.push(action.payload.result);
            } else {
                state.progaress = "error";
                state.message = action.payload.error;
            }

        });
        builder.addCase(createClient.rejected, (state, action) => {
            state.progaress = "error"
        });

        // builder.addCase(activeProject.pending, (state) => {
        //     state.progaress = "pending"
        // });

        // builder.addCase(activeProject.fulfilled, (state, action) => {

        //     // console.log(action.payload)
        //     if (action.payload.success == true) {
        //         state.progaress = "active-done"
        //         state.projects = state.projects.map((item) => {
        //             if (item.id === action.payload.id) {
        //                 item.status = 0
        //             }
        //             return item;
        //         })
        //         // console.log(state.project)
        //     } else {
        //         state.progaress = "error";
        //         state.message = action.payload.error;
        //     }
        // });

        // builder.addCase(activeProject.rejected, (state) => {
        //     state.progaress = "error"
        // });

        // builder.addCase(inactiveProject.pending, (state) => {
        //     state.progaress = "pending"
        // });

        // builder.addCase(inactiveProject.fulfilled, (state, action) => {
        //     if (action.payload.success = true) {
        //         state.progaress = "inactive-done"
        //         state.projects = state.projects.map((item) => {
        //             if (item.id === action.payload.id) {
        //                 item.status = 1
        //             }
        //             return item;
        //         })
        //     } else {
        //         state.progaress = "error";
        //         state.message = action.payload.error;
        //     }
        // });

        // builder.addCase(inactiveProject.rejected, (state) => {
        //     state.progaress = "error"
        // });
        // builder.addCase(deleteProject.pending, (state, action) => {
        //     state.progaress = "pending"
        // });
        // builder.addCase(deleteProject.fulfilled, (state, action) => {
        //     // console.log(action.payload)

        //     if (action.payload.status === 200) {
        //         state.progaress = "delete-done"
        //         state.projects = state.projects.filter((item) => item.id !== action.payload.id)
        //     } else {
        //         state.progaress = "error";
        //         state.message = action.payload.error;
        //     }
        // });
        // builder.addCase(deleteProject.rejected, (state, action) => {
        //     state.progaress = "error"
        // });
    }

});

const selectAll = (state: RootState) => state.project;
export const getAllProjectSelector = createSelector(
    selectAll,
    (state) => state.projects
);

export const getQuantitySelector = createSelector(
    selectAll,
    (state) => state.quantitys
);

export const getAllCustomeSelector = createSelector(
    selectAll,
    (state) => state.customes
);

// export const getUsersSelector = createSelector(
//     selectAll,
//     (state) => state.users
// );

// export const getProject2 = createSelector(
//     selectAll,
//     (state) => state.project
// )

// console.log(getProject)

export const {
     resetSelectedMembers,
     pushMembers, removeMembers, updateMemberType, pushTasks, removeTask, updateBillable 
} = projectSlice.actions;

export default projectSlice;