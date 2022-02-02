import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./configureStore"

interface PlayersState {
  value: any | null
  player: any | null
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
  extraReducers: {}
})

export const { addPlayersData, addPlayerData } = playersSlice.actions

export const selectPlayers = (state: RootState) => state.players.value

export default playersSlice.reducer