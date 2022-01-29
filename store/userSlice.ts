import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import type { RootState } from 'store/configureStore'

export const loadMyInfo = createAsyncThunk(
  "GET/LOAD_MY_INFO_REQUEST",
  async () => {
    const response = await axios.get('/user/myInfo')
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
    // functionAnything: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
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
  }
})

// export const { functionAnything } = userSlice.actions

export const selectUser = (state: RootState) => state.user.value

export default userSlice.reducer