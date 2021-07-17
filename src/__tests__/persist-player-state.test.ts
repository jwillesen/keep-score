import persistPlayerState from "../persist-player-state"
import { store, initialState } from "../store"

describe("persistPlayerState", () => {
  let unsubscribePlayerState: null | (() => void) = null

  const persist = () => {
    unsubscribePlayerState = persistPlayerState()
  }

  afterEach(() => {
    localStorage.clear()
    if (unsubscribePlayerState) unsubscribePlayerState()
    store.replace(initialState)
  })

  it("does not initialize state if no state is saved", () => {
    persist()
    expect(store.getRawState()).toEqual(initialState)
  })

  it("initializes pullstate with saved state", () => {
    const storedState = [
      { name: "Foo", score: 42, active: false },
      { name: "Bar", score: 21, active: true },
    ]
    localStorage.setItem("players", JSON.stringify(storedState))
    persist()
    expect(store.getRawState().players).toEqual(storedState)
  })

  it("saves player state when it changes", () => {
    persist()
    store.update(s => {
      s.players[0].score = 4242
    })
    let stored = JSON.parse(localStorage.getItem("players") || "{}")
    expect(stored[0].score).toEqual(4242)
    store.update(s => {
      s.players[1].score = 12345
    })
    stored = JSON.parse(localStorage.getItem("players") || "{}")
    expect(stored[1].score).toEqual(12345)
  })

  it("does not store after unsubscribing", () => {
    persist()
    store.update(s => {
      s.players[0].score = 4242
    })
    if (unsubscribePlayerState) unsubscribePlayerState()
    store.update(s => {
      s.players[0].score = 12345
    })
    let stored = JSON.parse(localStorage.getItem("players") || "{}")
    expect(stored[0].score).toEqual(4242)
  })
})
