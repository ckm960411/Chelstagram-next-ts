import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/configureStore";
import axios from "axios";

export const addPost = createAsyncThunk(
  "POST/ADD_POST_REQUEST",
  async (data: PostFeedType) => {
    const response = await axios.post('http://localhost:3000/post', data)
    return response.data
  }
)
export const editPost = createAsyncThunk(
  "PATCH/EDIT_POST_REQUEST",
  async (data: EditFeedType) => {
    const response = await axios.patch(`http://localhost:3000/api/post/edit/${data.postId}`, data)
    return response.data
  }
)
export const deletePost = createAsyncThunk(
  "DELETE/DELETE_POST_REQUEST",
  async (data: DeleteFeedType) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/post/delete/${data.postId}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)
export const addPostComment = createAsyncThunk(
  "POST/ADD_POST_COMMENT_REQUEST",
  async (data: PostFeedCommentType) => {
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
    },
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
    [editPost.pending.type]: (state, action) => {
      state.loading = true
    },
    [editPost.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.errorMessage) {
        state.error = action.payload
      } else {
        const finded = state.value.find(v => v.id === action.payload.id)
        finded!.content.postText = action.payload.postText
        finded!.content.postImg = action.payload.postImg
        finded!.modifiedAt = action.payload.modifiedAt
      }
    },
    [deletePost.pending.type]: (state, action) => {
      state.loading = true
    },
    [deletePost.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.errorMessage) {
        state.error = action.payload
      } else {
        const findedIndex = state.value.findIndex(post => post.id === action.payload.id)
        state.value.splice(findedIndex, 1)
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
