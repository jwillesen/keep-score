/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react/macro"
import { store } from "../../store"
import { findActivePlayerIndex } from "../../utils"

const scoreButtonStyles = css`
  background-color: white;
  border: 2px solid black;
  border-radius: 500px;
  padding: 8px;
  font-size: 1.8rem;
  width: 5rem;
  height: 5rem;
`

interface Props {
  scoreModifier: number
}

export default function ScoreButton({ scoreModifier }: Props) {
  const players = store.useState(s => s.players)
  const sign = scoreModifier >= 0 ? "+" : "" // minus sign added in toString call

  function changeScore() {
    const activePlayerIndex = findActivePlayerIndex(players)
    if (activePlayerIndex < 0) return
    store.update(s => {
      s.players[activePlayerIndex].score += scoreModifier
    })
  }

  return (
    <button type="button" css={scoreButtonStyles} onClick={changeScore}>
      {sign}
      {scoreModifier.toString()}
    </button>
  )
}
