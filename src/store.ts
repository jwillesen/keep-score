import { Store } from "pullstate"

export interface Player {
  name: string
  score: number
  active: boolean
}

export enum Mode {
  SETUP = "setup",
  SCORE = "score",
  ADD_PLAYER = "add-player",
  SETTINGS = "settings",
}

export interface State {
  players: Player[]
  mode: Mode
}

const initialState: State = {
  mode: Mode.SCORE,
  players: [
    { name: "Amanda", score: 42, active: false },
    { name: "Beth", score: 8, active: true },
    { name: "Céline", score: 0, active: false },
    { name: "Diane", score: 3, active: false },
  ],
}

export const store = new Store<State>(initialState)
