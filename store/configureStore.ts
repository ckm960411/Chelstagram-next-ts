import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'store/usersSlice'
import playersReducer from 'store/playersSlice'
import postsReducer from 'store/postsSlice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    players: playersReducer,
    posts: postsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch