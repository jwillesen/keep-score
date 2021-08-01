import { store } from "./store"

export default function persistPlayerState() {
  const previouslyStoredPlayersString = localStorage.getItem("players")
  if (previouslyStoredPlayersString) {
    try {
      store.update(s => {
        s.players = JSON.parse(previouslyStoredPlayersString)
        s.players.forEach(p => {
          p.scoreModifier = p.scoreModifier || 0
        })
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
