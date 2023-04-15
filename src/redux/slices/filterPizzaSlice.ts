import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FilterState {
  sortName: string;
  categoryId: number;
  order: string;
  searchQuery: string;
}

const initialState: FilterState = {
  sortName: "rating",
  categoryId: 0,
  order: "asc",
  searchQuery: "",
};

const filterPizzaSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortName: (state, action: PayloadAction<string>) => {
      state.sortName = action.payload;
    },

    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },

    setOrder: (state, action: PayloadAction<string>) => {
      state.order = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setFilters: (state, action) => {
      const { sortName, categoryId, order } = action.payload;
      state.sortName = sortName;
      state.categoryId = categoryId;
      state.order = order;
    },
  },
});

export const selectFilterPizza = (state: RootState) => state.filterPizza;

export const {
  setSortName,
  setCategoryId,
  setOrder,
  setSearchQuery,
  setFilters,
} = filterPizzaSlice.actions;
export default filterPizzaSlice.reducer;
