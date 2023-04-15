import { configureStore } from "@reduxjs/toolkit";
import filterPizzaReducer from "./slices/filterPizzaSlice";
import cartReducer from "./slices/cartSlice";
import pizzasReducer from "./slices/pizzaItems";

export const store = configureStore({
  reducer: {
    filterPizza: filterPizzaReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
});
