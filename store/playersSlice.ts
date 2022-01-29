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
    loadPlayersData: (state, action) => {
      state.value = action.payload
    }
  },
  extraReducers: {}
})

export const {loadPlayersData} = playersSlice.actions

export const selectPlayers = (state: RootState) => state.players.value

export default playersSlice.reducer