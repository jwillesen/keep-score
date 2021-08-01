/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react/macro"
import Button from "@material-ui/core/Button"
import { store } from "../../store"
import { findActivePlayerIndex } from "../../utils"

const scoreButtonStyles = css`
  border-radius: 500px;
  font-size: 1.5rem;
  width: 4.5rem;
  height: 4.5rem;
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
      s.players[activePlayerIndex].scoreModifier += scoreModifier
    })
  }

  return (
    <Button
      css={scoreButtonStyles}
      size="large"
      variant="outlined"
      onClick={changeScore}
    >
      {sign}
      {scoreModifier.toString()}
    </Button>
  )
}
