import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
const pizzaHttp = "https://631c90e74fa7d3264cb16c69.mockapi.io/items";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params: any) => {
    const { data } = await axios.get(pizzaHttp, params);
    return data;
  }
);

type PizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  totalPrice: number;
  count: number;
};

interface PizzaState {
  items: PizzaItem[];
  pizzaCounter: number;
  isLoading: boolean;
  isError: boolean;
}

const initialState: PizzaState = {
  items: [],
  pizzaCounter: 10,
  isLoading: true,
  isError: false,
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,

  reducers: {},

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

export const selectPizzas = (state: RootState) => state.pizzas;

export default pizzasSlice.reducer;
