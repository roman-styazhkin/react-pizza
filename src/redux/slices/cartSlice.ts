import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CartItemType = {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  totalPrice: number;
  count: number;
};

interface CartSliceState {
  items: CartItemType[];
  totalPrice: number;
  totalPizzaCount: number;
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
  totalPizzaCount: 0,
};

const recalculatePrice = (state: CartSliceState) => {
  state.totalPrice = state.items.reduce(
    (acc: number, item: CartItemType) => acc + item.totalPrice,
    0
  );
  state.totalPizzaCount = state.items.reduce(
    (acc: number, item: CartItemType) => acc + item.count,
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

    removeItem: (state, action: PayloadAction<CartItemType>) => {
      const findedItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findedItem && findedItem.count > 1) {
        findedItem.count--;
        findedItem.totalPrice -= action.payload.price;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }

      recalculatePrice(state);
    },

    deleteItem: (state, action: PayloadAction<string>) => {
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

export const selectCart = (state: RootState) => state.cart;
export const selectItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

export const { addItem, removeItem, clearItems, deleteItem } =
  cartSlice.actions;
export default cartSlice.reducer;
