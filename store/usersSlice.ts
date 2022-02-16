import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import type { RootState } from 'store/configureStore'

export const loginRequest = createAsyncThunk(
  "POST/LOGIN_REQUEST",
  async (data: LoginFormValue) => {
    const response = await axios.post('http://localhost:3000/user/login', data)
    return response.data
  }
)
export const logoutRequest = createAsyncThunk(
  "POST/LOGOUT_REQUEST",
  async () => {
    const response = await axios.post('http://localhost:3000/api/user/logout')
    return response.data
  }
)
export const signUpRequest = createAsyncThunk(
  "POST/SIGNUP_REQUEST",
  async (data: SignUpFormValue) => {
    const response = await axios.post('http://localhost:3000/user/signup', data)
    return response.data
  }
)
export const editProfileRequest = createAsyncThunk(
  "PATCH/EDIT_PROFILE_REQUEST",
  async (data: EditProfileType) => {
    const response = await axios.patch(`http://localhost:3000/api/profile/${data.userId}`, data)
    return response.data
  }
)

interface UserState {
  value: any | null
  myInfo: UserType | null
  loading: boolean
  error: { errorMessage: string } | null
}

const initialState: UserState = {
  value: null,
  myInfo: null,
  loading: false,
  error: null
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    closeError: state => {
      state.error = null
    }
  },
  extraReducers: {
    [loginRequest.pending.type]: (state, action) => {
      state.loading = true
      state.value = null
    },
    [loginRequest.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.errorMessage) {
        state.error = action.payload
      } else {
        state.myInfo = action.payload
      }
    },
    [signUpRequest.pending.type]: (state, action) => {
      state.loading = true
      state.value = null
    },
    [signUpRequest.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.errorMessage) {
        state.error = action.payload
      } else {
        state.myInfo = action.payload
      }
    },
    [editProfileRequest.pending.type]: (state, action) => {
      state.loading = true
      state.value = null
    },
    [editProfileRequest.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.errorMessage) {
        state.error = action.payload
      } else {
        state.myInfo!.name = action.payload.name
        state.myInfo!.nickname = action.payload.nickname
        state.myInfo!.profileImg = action.payload.profileImg
      }
    },
    [logoutRequest.pending.type]: (state, action) => {
      state.loading = true
      state.value = null
    },
    [logoutRequest.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.errorMessage) {
        state.error = action.payload
      } else {
        state.myInfo = null
      }
    },
  }
})

export const { closeError } = usersSlice.actions

export const selectUser = (state: RootState) => state.users.value

export default usersSlice.reducer