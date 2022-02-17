import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { FollowReqType } from 'components/profile/FollowLIst'
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
export const loadFollowers = createAsyncThunk(
  "GET/LOAD_FOLLOWERS_REQUEST",
  async (data: FollowReqType) => {
    const response = await axios.get(`http://localhost:3000/api/${data.reqType}/${data.userId}`)
    return response.data
  }
)
export const loadFollowings = createAsyncThunk(
  "GET/LOAD_FOLLOWINGS_REQUEST",
  async (data: FollowReqType) => {
    const response = await axios.get(`http://localhost:3000/api/${data.reqType}/${data.userId}`)
    return response.data
  }
)

interface UserState {
  value: any | null
  myInfo: UserType | null
  myFollowers: FollowInfoType[]
  myFollowings: FollowInfoType[]
  loading: boolean
  error: { errorMessage: string } | null
}

const initialState: UserState = {
  value: null,
  myInfo: null,
  myFollowers: [],
  myFollowings: [],
  loading: false,
  error: null
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    closeError: state => {
      state.error = null
    },
    clearFollowList: state => {
      state.myFollowers = []
      state.myFollowings = []
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
    [loadFollowers.pending.type]: (state, action) => {
      state.loading = true
      state.value = null
    },
    [loadFollowers.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.errorMessage) {
        state.error = action.payload
      } else {
        state.myFollowers = action.payload.followers
      }
    },
    [loadFollowings.pending.type]: (state, action) => {
      state.loading = true
      state.value = null
    },
    [loadFollowings.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.errorMessage) {
        state.error = action.payload
      } else {
        state.myFollowings = action.payload.followings
      }
    },
  }
})

export const { closeError, clearFollowList } = usersSlice.actions

export const selectUser = (state: RootState) => state.users.value

export default usersSlice.reducer