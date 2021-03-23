/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro"
import Button from "@material-ui/core/Button"
import { store } from "../../store"
import Icon from "../../components/icon"
import { findActivePlayerIndex } from "../../utils"

const actionWrapperStyles = css`
  display: flex;
  justify-content: space-between;
`

export default function ActionBar() {
  const players = store.useState(s => s.players)

  function handleNextPlayer() {
    let nextPlayerIndex = findActivePlayerIndex(players) + 1
    if (nextPlayerIndex >= players.length) nextPlayerIndex = 0
    store.update(s => {
      s.players.forEach((player, index) => {
        player.active = index === nextPlayerIndex
      })
    })
  }

  function handlePreviousPlayer() {
    let previousPlayerIndex = findActivePlayerIndex(players) - 1
    if (previousPlayerIndex < 0) previousPlayerIndex = players.length - 1
    store.update(s => {
      s.players.forEach((player, index) => {
        player.active = index === previousPlayerIndex
      })
    })
  }

  return (
    <div css={actionWrapperStyles}>
      <Button
        startIcon={<Icon name="arrow-left" />}
        size="large"
        onClick={handlePreviousPlayer}
      >
        Previous
      </Button>
      <Button
        size="large"
        endIcon={<Icon name="arrow-right" />}
        onClick={handleNextPlayer}
      >
        Next
      </Button>
    </div>
  )
}
