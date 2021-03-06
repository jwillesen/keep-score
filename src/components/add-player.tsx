/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro"
import { useEffect, useRef } from "react"
import { store, Mode, Player } from "../store"

const inputStyles = css`
  display: block;
  font-size: 2rem;
  border: 1px solid black;
  border-radius: 8px;
  margin-top: 8px;
`

const buttonStyles = css`
  background-color: white;
  border: 1px solid black;
  border-radius: 500px; /* sufficiently large for a pill shape */
  font-size: 1em;
  margin: 8px 0 0 8px;
  padding: 12px;
`

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

  useEffect(() => {
    input.current?.focus()
    input.current?.click()
  }, [])

  return (
    <div>
      <label>
        Player Name:
        <input css={inputStyles} ref={input} type="text" />
      </label>
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <button
          type="button"
          css={buttonStyles}
          onClick={() =>
            store.update(s => {
              s.mode = Mode.SCORE
            })
          }
        >
          Cancel
        </button>
        <button type="button" css={buttonStyles} onClick={addPlayer}>
          Add Player
        </button>
      </div>
    </div>
  )
}
