import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const { data } = await axios.get('https://fakestoreapi.com/products')
    return data
  }
)

const initialState = {
  entities: null,
  isLoading: true,
  error: null,
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending.type]: (state) => {
      state.entities = null
      state.isLoading = true
    },
    [fetchProducts.fulfilled.type]: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    [fetchProducts.rejected.type]: (state) => {
      state.entities = null
      state.isLoading = false
    },
  },
})

const { reducer: productReducer, actions } = productSlice
export const {} = actions

export const getProducts = () => (state) => state.products.entities

export const getProductsLoadingStatus = () => (state) =>
  state.products.isLoading

export const getProductById = (productId) => (state) => {
  if (state.products.entities) {
    return state.products.entities.find((p) => p.id === productId)
  }
}

export default productReducer
