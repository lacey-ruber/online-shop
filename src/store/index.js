import { combineReducers, configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice'
import productReducer from './slices/productSlice'

const rootReducer = combineReducers({
  filter: filterReducer,
  cart: cartReducer,
  products: productReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
