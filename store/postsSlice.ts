import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostTypes } from "types/postTypes";
import { RootState } from "store/configureStore";
import axios from "axios";
import { PostSubmitType } from "components/talk/FeedForm";
import { PostCommentType } from "components/talk/feedComments/FeedCommentForm";

export const addPost = createAsyncThunk(
  "POST/ADD_POST_REQUEST",
  async (data: PostSubmitType) => {
    const response = await axios.post('http://localhost:3000/post', data)
    return response.data
  }
)
export const addPostComment = createAsyncThunk(
  "POST/ADD_POST_COMMENT_REQUEST",
  async (data: PostCommentType) => {
    const response = await axios.post(`http://localhost:3000/api/comment/${data.postId}`, data)
    return response.data
  }
)

interface PostsState {
  value: PostTypes[]
  post: PostTypes | null
  loading: boolean
  error: object | null
}
const initialState: PostsState = {
  value: [],
  post: null,
  loading: false,
  error: null,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPostsData: (state, action) => {
      state.value = action.payload
    },
    addPostData: (state, action) => {
      state.post = action.payload
    }
  },
  extraReducers: {
    [addPost.pending.type]: (state, action) => {
      state.loading = true
    },
    [addPost.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.errorMessage) {
        state.error = action.payload
      } else {
        state.value?.unshift(action.payload)
      }
    },
    [addPostComment.pending.type]: (state, action) => {
      state.loading = true
    },
    [addPostComment.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.errorMessage) {
        state.error = action.payload
      } else {
        const postFinded = state.value.find(post => post.id === action.payload.postId)
        postFinded?.comments.unshift(action.payload)
      }
    },
  }
})

export const { addPostsData, addPostData } = postsSlice.actions

export const selectPlayers = (state: RootState) => state.players.value

export default postsSlice.reducer
