import { Player } from "./store"

export function findActivePlayerIndex(players: Player[]) {
  return players.findIndex(p => p.active)
}
