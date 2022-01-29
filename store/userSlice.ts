import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { LoginFormValue } from 'components/login/LoginForm'
import { SignUpFormValue } from 'components/login/SignUpForm'
import type { RootState } from 'store/configureStore'

export const loginRequest = createAsyncThunk(
  "POST/LOGIN_REQUEST",
  async (data: LoginFormValue) => {
    const response = await axios.post('http://localhost:3000/user/login', data)
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

interface UserState {
  value: any | null //
  loading: boolean
  error: object | null
}

const initialState: UserState = {
  value: null,
  loading: false,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
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
        state.value = action.payload
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
        state.value = action.payload
      }
    },
  }
})

export const { closeError } = userSlice.actions

export const selectUser = (state: RootState) => state.user.value

export default userSlice.reducer