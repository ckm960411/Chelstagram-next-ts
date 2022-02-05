import { createSlice } from "@reduxjs/toolkit";
import { PostTypes } from "types/postTypes";
import { RootState } from "store/configureStore";

interface PostsState {
  value: PostTypes[] | null
  post: PostTypes | null
  loading: boolean
  error: object | null
}
const initialState: PostsState = {
  value: null,
  post: null,
  loading: false,
  error: null,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {}
})

export const {} = postsSlice.actions

export const selectPlayers = (state: RootState) => state.players.value

export default postsSlice.reducer
