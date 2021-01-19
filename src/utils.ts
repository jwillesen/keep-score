import { Player } from "./pullstate"

export function findActivePlayerIndex(players: Player[]) {
  return players.findIndex(p => p.active)
}
