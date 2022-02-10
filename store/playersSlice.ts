import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "store/configureStore"
import axios from "axios"

export const addPlayerComment = createAsyncThunk(
  "POST/ADD_PLAYER_COMMENT_REQUEST",
  async (data: PostPlayerCommentType) => {
    const response = await axios.post(`http://localhost:3000/players/${data.playerId}/comment`, data)
    return response.data
  }
)
export const editPlayerComment = createAsyncThunk(
  "PATCH/EDIT_PLAYER_COMMENT_REQUEST",
  async ( data: EditPlayerCommentType ) => {
    const response = await axios.patch(`http://localhost:3000/players/${data.playerId}/comment/${data.commentId}`, data)
    return response.data
  }
)
export const deletePlayerComment = createAsyncThunk(
  "DELETE/DELETE_PLAYER_COMMENT_REQUEST",
  async ( data: DeletePlayerCommentType ) => {
    const response = await axios.delete(`http://localhost:3000/players/${data.playerId}/comment/${data.commentId}`)
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
    [editPlayerComment.pending.type]: (state, action) => {
      state.loading = true
    },
    [editPlayerComment.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.errorMessage) {
        state.error = action.payload
      } else {
        const finded = state.player!.comments.find(comment => comment.id === action.payload.commentId)
        finded!.text = action.payload.text
        finded!.modifiedAt = action.payload.modifiedAt
      }
    },
    [deletePlayerComment.pending.type]: (state, action) => {
      state.loading = true
    },
    [deletePlayerComment.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.errorMessage) {
        state.error = action.payload
      } else {
        const findedIndex = state.player!.comments.findIndex(comment => comment.id === action.payload.commentId)
        state.player?.comments.splice(findedIndex, 1)
      }
    },
  }
})

export const { addPlayersData, addPlayerData } = playersSlice.actions

export const selectPlayers = (state: RootState) => state.players.value

export default playersSlice.reducer