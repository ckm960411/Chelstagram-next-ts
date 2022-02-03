import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CommentData } from "components/playerInfo/comments/CommentForm"
import { PlayerProfile } from "types/playerTypes"
import { RootState } from "store/configureStore"
import axios from "axios"

export const addPlayerComment = createAsyncThunk(
  "POST/ADD_PLAYER_COMMENT_REQUEST",
  async (data: CommentData) => {
    const response = await axios.post(`http://localhost:3000/players/${data.backNumber}/comment`, data)
    return response.data
  }
)

interface PlayersState {
  value: Array<PlayerProfile> | null
  player: PlayerProfile | null
  loading: boolean
  error: object | null
}
const initialState: PlayersState ={
  value: null,
  player: null,
  loading: false,
  error: null,
}

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addPlayersData: (state, action) => {
      state.player = null
      state.value = action.payload
    },
    addPlayerData: (state, action) => {
      state.value = null
      state.player = action.payload
    }
  },
  extraReducers: {
    [addPlayerComment.pending.type]: (state, action) => {
      state.loading = true
    },
    [addPlayerComment.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.errorMessage) {
        state.error = action.payload
      } else {
        state.player?.comments.unshift(action.payload)
      }
    },
  }
})

export const { addPlayersData, addPlayerData } = playersSlice.actions

export const selectPlayers = (state: RootState) => state.players.value

export default playersSlice.reducer