import { Store } from "pullstate"

export interface Player {
  name: string
  score: number
  scoreModifier: number
  active: boolean
}

export enum Mode {
  ManagePlayers = "manage-players",
  Score = "score",
  Settings = "settings",
}

export interface State {
  players: Player[]
  mode: Mode
}

export const initialState: State = {
  mode: Mode.Score,
  players: [
    { name: "Amanda", score: 42, scoreModifier: 0, active: false },
    { name: "Beth", score: 8, scoreModifier: 0, active: true },
    { name: "Céline", score: 0, scoreModifier: 0, active: false },
    { name: "Diane", score: 3, scoreModifier: 0, active: false },
  ],
}

export const store = new Store<State>(initialState)
