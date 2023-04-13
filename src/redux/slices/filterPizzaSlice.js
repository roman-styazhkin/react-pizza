import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortName: "rating",
  categoryId: "0",
  order: "asc",
  searchQuery: "",
};

const filterPizzaSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortName: (state, action) => {
      state.sortName = action.payload;
    },

    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },

    setOrder: (state, action) => {
      state.order = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    setFilters: (state, action) => {
      const { sortName, categoryId, order } = action.payload;
      state.sortName = sortName;
      state.categoryId = Number(categoryId);
      state.order = order;
    },
  },
});

export const selectFilterPizza = (state) => state.filterPizza;

export const {
  setSortName,
  setCategoryId,
  setOrder,
  setSearchQuery,
  setFilters,
} = filterPizzaSlice.actions;
export default filterPizzaSlice.reducer;
