import { createSlice } from "@reduxjs/toolkit";
import { activatePremium } from "./theme";

const initialState={
    expenses:[],
    totalAmount:0
}
const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    getExpenses(state, action) {
      state.expenses = action.payload.expenses;
      state.totalAmount = action.payload.totalAmount;
    },
    addExpense(state, action) {
      state.expenses.push(action.payload);
      state.totalAmount += Number.parseInt(action.payload.amount);
    },
    removeExpense(state, action) {
      const deletedExpense = state.expenses.find((expense) => expense.id === action.payload);
      if (deletedExpense) {
        state.totalAmount -= Number.parseInt(deletedExpense.amount);
      }
      state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
    },
    editExpense(state, action) {
      const index = state.expenses.findIndex((expense) => expense.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = { ...state.expenses[index], ...action.payload.updatedExpense };
      }
    },
  },
});

export const expenseAction=expenseSlice.actions;
export default expenseSlice.reducer


export const fetchExpenses = () => {
  return async (dispatch) => {
    try {
      const userId = localStorage.getItem("localId");
      const url = `https://e-commerce-35754-default-rtdb.firebaseio.com/expenses/${userId}.json`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to fetch expenses");

      const data = await response.json();

      let totalAmount = 0;
      const expensesArray = Object.keys(data || {}).map((key) => {
        totalAmount += Number.parseInt(data[key].amount);
        return {
          id: key,
          ...data[key],
        };
      });
      

      dispatch(
        expenseAction.getExpenses({
          expenses: expensesArray,
          totalAmount,
        })
      );
      if(totalAmount>10000){
        dispatch(activatePremium(true))
      }
      else if (totalAmount<10000)
      {
        dispatch(activatePremium(false))
        
      }
       

    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteExpense = (id) => {
  return async (dispatch) => {
    const userId = localStorage.getItem("localId");
    try {
      const url = `https://e-commerce-35754-default-rtdb.firebaseio.com/expenses/${userId}/${id}.json`;
      const response = await fetch(url, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete expense.");
      }

      dispatch(expenseAction.removeExpense(id));
      dispatch(fetchExpenses()); 
    } catch (error) {
      console.error(error);
    }
  };
};


export const updateExpense = (id, updatedExpense) => {
  return async (dispatch) => {
    const userId = localStorage.getItem("localId");
            try {
      const url = `https://e-commerce-35754-default-rtdb.firebaseio.com/expenses/${userId}/${id}.json`;
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(updatedExpense),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update expense");
      }

      dispatch(expenseAction.editExpense({ id, updatedExpense }));
      dispatch(fetchExpenses()); // 🔥 Re-fetch updated expenses list
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };
};

export const addExpense = (expense) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;

    try {
      const url = `https://e-commerce-35754-default-rtdb.firebaseio.com/expenses/${userId}.json?auth=${token}`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(expense),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add expense.");
      }

      dispatch(fetchExpenses());  
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };
};

