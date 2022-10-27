import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchQuery: '',
  categories: null,
  sortBy: { path: 'name', order: 'asc' },
  selectedCategories: undefined,
  currentPage: 1,
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
})

const { reducer: filterReducer, actions } = filterSlice
export const {
  setSearchQuery,
  setCategories,
  setSortBy,
  setSelectedCategories,
  setCurrentPage,
} = actions

export default filterReducer
