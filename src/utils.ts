import { Player } from "./store"

export function findActivePlayerIndex(players: Player[]) {
  return players.findIndex(p => p.active)
}

export function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
