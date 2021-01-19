/** @jsxImportSource @emotion/react */
import { useRef } from "react"
import { store, Mode, Player } from "../pullstate"

export default function AddPlayer() {
  const players = store.useState(s => s.players)
  const input = useRef<HTMLInputElement>(null)

  function addPlayer() {
    const playerName = input.current?.value
    if (!playerName) return
    let insertionIndex = players.findIndex(p => p.active) + 1
    store.update(s => {
      const newPlayer: Player = { name: playerName, score: 0, active: true }
      s.players.forEach(p => (p.active = false))
      s.players.splice(insertionIndex, 0, newPlayer)
      s.mode = Mode.SCORE
    })
  }

  return (
    <div>
      <label>
        Player Name:
        <input ref={input} type="text" />
      </label>
      <button
        type="button"
        onClick={() =>
          store.update(s => {
            s.mode = Mode.SCORE
          })
        }
      >
        Cancel
      </button>
      <button type="button" onClick={addPlayer}>
        Add Player
      </button>
    </div>
  )
}
