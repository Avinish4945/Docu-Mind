import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
    name :'auth',
    initialState:{
        User:null,
        isLoading:false





    },
    reducers:{
        addUsers:(state,action)=>{
            state.User=action.payload
            state.isLoading=false
        },

        removeUser:(state,action)=>{
            state.User=null
              state.isLoading=false


        }
    }
})

export const {addUsers,removeUser}=authSlice.actions
