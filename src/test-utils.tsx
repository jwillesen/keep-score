import { store, State, Mode } from "./store"

export function restoreState() {
  const currentState = store.getRawState()
  return function restore() {
    store.replace(currentState)
  }
}

export function initialState(overrides: Partial<State> = {}): State {
  return {
    mode: Mode.Score,
    players: [
      { name: "Amanda", score: 42, active: false },
      { name: "Beth", score: 8, active: true },
      { name: "Céline", score: 0, active: false },
      { name: "Diane", score: 3, active: false },
    ],
    ...overrides,
  }
}
