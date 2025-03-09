import { configureStore } from "@reduxjs/toolkit";
import  authReducer  from "./auth";
import expenseReducer from "./expense"
import themReducer from "./theme"
const store=configureStore({
    reducer:{
        auth:authReducer,
        expense: expenseReducer,
        theme:themReducer
    }
})

export default store;