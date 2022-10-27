import { createSlice } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice'

const initialState = {
  goods: [],
  totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const findProduct = state.goods.find(
        (obj) => obj.id === action.payload.id
      )
      if (findProduct) {
        findProduct.count++
      } else {
        state.goods.push({
          ...action.payload,
          count: 1,
        })
      }

      state.totalPrice = calcTotalPrice(state.goods)
    },
    minusProduct: (state, action) => {
      const findProduct = state.goods.find((obj) => obj.id === action.payload)

      if (findProduct) {
        findProduct.count--
      }

      state.totalPrice = calcTotalPrice(state.goods)
    },
    removeProduct: (state, action) => {
      state.goods = state.goods.filter((obj) => obj.id !== action.payload)
      state.totalPrice = calcTotalPrice(state.goods)
    },
    clearGoods: (state) => {
      state.goods = []
      state.totalPrice = 0
    },
  },
})

export const { reducer: cartReducer, actions } = cartSlice

export const { addProduct, minusProduct, removeProduct, clearGoods } = actions

export default cartReducer
