import { store } from "./store"

export default function persistPlayerState() {
  const previouslyStoredPlayersString = localStorage.getItem("players")
  if (previouslyStoredPlayersString) {
    try {
      store.update(s => {
        s.players = JSON.parse(previouslyStoredPlayersString)
      })
    } catch {}
  }

  const unsubscribe = store.subscribe(
    s => s.players,
    players => {
      localStorage.setItem("players", JSON.stringify(players))
    }
  )

  return unsubscribe
}
