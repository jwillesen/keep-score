/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro"
import { store } from "../store"
import {
  playerTableStyles,
  playerTableGridStyles,
  playerNameStyles,
} from "../shared-styles"

const playerDisplayStyles = css`
  ${playerTableStyles};
  ${playerTableGridStyles};
`

export default function ManagePlayers() {
  const players = store.useState(s => s.players)

  return (
    <div data-testid="manage-players-page">
      <div css={playerDisplayStyles}>
        {players.map(player => (
          <div css={playerNameStyles} key={player.name}>
            {player.name}
          </div>
        ))}
      </div>
    </div>
  )
}
