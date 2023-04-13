import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const pizzaHttp = "https://631c90e74fa7d3264cb16c69.mockapi.io/items";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { data } = await axios.get(pizzaHttp, params);
    return data;
  }
);

const initialState = {
  items: [],
  pizzaCounter: 10,
  isLoading: true,
  isError: false,
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.pizzaCounter = action.payload.count;
      state.isLoading = false;
    });

    builder.addCase(fetchPizzas.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const selectPizzas = (state) => state.pizzas;

export const { setPizzas, setCounter, setIsLoading } = pizzasSlice.actions;
export default pizzasSlice.reducer;
