import { Store } from "pullstate"

export interface Player {
  name: string
  score: number
  active: boolean
}

export interface State {
  players: Player[]
}

const initialState: State = {
  players: [
    { name: "Amanda", score: 42, active: false },
    { name: "Beth", score: 8, active: true },
    { name: "Céline", score: 0, active: false },
    { name: "Diane", score: 3, active: false },
  ],
}

export const store = new Store<State>(initialState)
