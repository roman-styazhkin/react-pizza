import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalPizzaCount: 0,
};

const recalculatePrice = (state) => {
  state.totalPrice = state.items.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );
  state.totalPizzaCount = state.items.reduce(
    (acc, item) => acc + item.count,
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem: (state, action) => {
      const findedItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findedItem) {
        findedItem.count++;
        findedItem.totalPrice = action.payload.price * findedItem.count;
      } else {
        state.items = [...state.items, action.payload];
      }

      recalculatePrice(state);
    },

    removeItem: (state, action) => {
      const findedItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findedItem.count > 1) {
        findedItem.count--;
        findedItem.totalPrice -= action.payload.price;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }

      recalculatePrice(state);
    },

    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      recalculatePrice(state);
    },

    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalPizzaCount = 0;
      recalculatePrice(state);
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectItemById = (id) => (state) =>
  state.cart.items.find((item) => item.id === id);

export const { addItem, removeItem, clearItems, deleteItem } =
  cartSlice.actions;
export default cartSlice.reducer;
