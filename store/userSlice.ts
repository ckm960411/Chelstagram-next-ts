import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { FormValue } from 'components/login/LoginForm'
import type { RootState } from 'store/configureStore'

export const loadMyInfo = createAsyncThunk(
  "GET/LOAD_MY_INFO_REQUEST",
  async () => {
    const response = await axios.get('/user/myInfo')
    return response.data
  }
)

export const loginRequest = createAsyncThunk(
  "POST/LOGIN_REQUEST",
  async (data: FormValue) => {
    const response = await axios.post('http://localhost:3000/user/login', data)
    return response.data
  }
)

interface UserState {
  value: any //
  loading: boolean
  error: object | null
}

const initialState: UserState = {
  value: [],
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
    [loadMyInfo.pending.type]: (state, action) => {
      state.loading = true
      state.value = []
    },
    [loadMyInfo.fulfilled.type]: (state, action) => {
      state.loading = false
      state.value = action.payload
    },
    [loadMyInfo.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [loginRequest.pending.type]: (state, action) => {
      state.loading = true
      state.value = []
    },
    [loginRequest.fulfilled.type]: (state, action) => {
      state.loading = false
      state.value.push(action.payload)
    },
    [loginRequest.rejected.type]: (state, action) => {
      state.loading = false
      state.error = { errorMessage: "Faield to login. Check your email and password."}
    },
  }
})

export const { closeError } = userSlice.actions

export const selectUser = (state: RootState) => state.user.value

export default userSlice.reducer