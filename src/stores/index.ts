import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { api } from '../services/api'

const reducer = combineReducers({})

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})