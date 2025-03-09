import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        token:localStorage.getItem("token"),
        userId:localStorage.getItem("localId")
    },
    reducers:{
        login(state,action){
            state.token=action.payload.idToken;
            state.userId=action.payload.localId;
        },
        logout(state){
            state.token=null;
            state.userId=null;
            localStorage.removeItem("token");
            localStorage.removeItem("localId");
        }
    }
})

export const authAction=authSlice.actions;
export default authSlice.reducer;