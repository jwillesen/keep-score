/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro"
import { Mode, store } from "../store"
import Icon from "./icon"
import SrOnly from "./sr-only"
import { findActivePlayerIndex } from "../utils"

const actionWrapperStyles = css`
  display: flex;
  justify-content: flex-end;
`

const actionButtonStyles = css`
  background-color: white;
  border: none;
  font-size: 1em;
  margin: 8px;
  padding: 0;
`

export default function ActionBar() {
  const players = store.useState(s => s.players)

  function removePlayer() {
    let doomedIndex = findActivePlayerIndex(players)
    if (doomedIndex < 0) return
    store.update(s => {
      s.players.splice(doomedIndex, 1)
      if (doomedIndex === s.players.length) doomedIndex -= 1
      if (doomedIndex < 0) return
      s.players[doomedIndex].active = true
    })
  }

  function moveUp() {
    let upIndex = findActivePlayerIndex(players)
    if (upIndex <= 0) return
    const upPlayer = players[upIndex]
    store.update(s => {
      s.players.splice(upIndex, 1)
      s.players.splice(upIndex - 1, 0, upPlayer)
    })
  }

  function moveDown() {
    let downIndex = findActivePlayerIndex(players)
    if (downIndex < 0 || downIndex >= players.length) return
    const downPlayer = players[downIndex]
    store.update(s => {
      s.players.splice(downIndex, 1)
      s.players.splice(downIndex + 1, 0, downPlayer)
    })
  }

  function resetScores() {
    store.update(s => {
      s.players.forEach(p => (p.score = 0))
    })
  }

  return (
    <div css={actionWrapperStyles}>
      <button
        type="button"
        css={actionButtonStyles}
        onClick={() =>
          store.update(s => {
            s.mode = Mode.AddPlayer
          })
        }
      >
        <Icon name="plus" />
        <SrOnly>Add Player</SrOnly>
      </button>
      <button type="button" css={actionButtonStyles} onClick={removePlayer}>
        <Icon name="minus" />
        <SrOnly>Remove Active Player</SrOnly>
      </button>
      <button type="button" css={actionButtonStyles} onClick={moveUp}>
        <Icon name="arrow-up" />
        <SrOnly>Move active player up</SrOnly>
      </button>
      <button type="button" css={actionButtonStyles} onClick={moveDown}>
        <Icon name="arrow-down" />
        <SrOnly>Move active player down</SrOnly>
      </button>
      <button type="button" css={actionButtonStyles} onClick={resetScores}>
        <Icon name="arrow-left-rotate" />
        <SrOnly>Reset scores to 0</SrOnly>
      </button>
      <button type="button" css={actionButtonStyles}>
        <Icon name="gear" />
        <SrOnly>Settings</SrOnly>
      </button>
    </div>
  )
}
