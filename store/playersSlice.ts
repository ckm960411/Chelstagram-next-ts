import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CommentData } from "components/playerInfo/comments/CommentForm"
import { PlayerProfile } from "types/playerTypes"
import { RootState } from "store/configureStore"
import axios from "axios"
import { DeleteCommentType, EditCommentType } from "components/playerInfo/comments/Comment"
import { LikeUnlikePlayerType } from "components/playerInfo/PlayerCard"

export const likeOrUnlikePlayer = createAsyncThunk(
  "POST/LIKE_OR_UNLIKE_PLAYER_REQUEST",
  async (data: LikeUnlikePlayerType) => {
    const response = await axios.post(`http://localhost:3000/players/${data.backNumber}/like`, data)
    return response.data
  }
)
export const addPlayerComment = createAsyncThunk(
  "POST/ADD_PLAYER_COMMENT_REQUEST",
  async (data: CommentData) => {
    const response = await axios.post(`http://localhost:3000/players/${data.backNumber}/comment`, data)
    return response.data
  }
)
export const editPlayerComment = createAsyncThunk(
  "PATCH/EDIT_PLAYER_COMMENT_REQUEST",
  async ( data: EditCommentType ) => {
    const response = await axios.patch(`http://localhost:3000/players/${data.playerNum}/comment`, data)
    return response.data
  }
)
export const deletePlayerComment = createAsyncThunk(
  "DELETE/DELETE_PLAYER_COMMENT_REQUEST",
  async ( data: DeleteCommentType ) => {
    const response = await axios.delete(`http://localhost:3000/players/${data.playerNum}/comment/${data.commentId}`)
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
        const finded = state.player!.comments.find(v => v.commentId === action.payload.commentId)
        finded!.text = action.payload.text
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
        const findedIndex = state.player!.comments.findIndex(v => v.commentId === action.payload.commentId)
        state.player?.comments.splice(findedIndex, 1)
      }
    },
    [likeOrUnlikePlayer.pending.type]: (state, action) => {
      state.loading = true
    },
    [likeOrUnlikePlayer.fulfilled.type]: (state, action) => {
      state.loading = false
      if (action.payload.errorMessage) {
        state.error = action.payload
      } else {
        const { userId } = action.payload
        const playerFinded = state.value!.find(player => player.playerId === action.payload.playerId)
        if (playerFinded?.likes.includes(userId)) { // 이미 좋아요했다면 좋아요 취소
          const userIdIndex = playerFinded.likes.findIndex(v => v === userId)
          playerFinded.likes.splice(userIdIndex, 1)
        } else { // 좋아요 추가
          playerFinded!.likes.push(userId)
        }
      }
    },
  }
})

export const { addPlayersData, addPlayerData } = playersSlice.actions

export const selectPlayers = (state: RootState) => state.players.value

export default playersSlice.reducer