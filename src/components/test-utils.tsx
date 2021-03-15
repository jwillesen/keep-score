import { store, State, Mode } from "../store"

export function resetState() {
  store.replace(initialState())
}

export function initialState(): State {
  return {
    mode: Mode.Score,
    players: [
      { name: "Amanda", score: 42, active: false },
      { name: "Beth", score: 8, active: true },
      { name: "Céline", score: 0, active: false },
      { name: "Diane", score: 3, active: false },
    ],
  }
}
