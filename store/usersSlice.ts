import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { LoginFormValue } from 'components/login/LoginForm'
import { SignUpFormValue } from 'components/login/SignUpForm'
import type { RootState } from 'store/configureStore'
import { UserType } from 'types/userType'

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
  myInfo: UserType | null
  loading: boolean
  error: object | null
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
  }
})

export const { closeError } = usersSlice.actions

export const selectUser = (state: RootState) => state.users.value

export default usersSlice.reducer