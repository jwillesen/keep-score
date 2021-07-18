/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro"
import { store } from "../store"
import EditPlayerRow from "./manage-players/edit-player-row"
import AddPlayerForm from "./manage-players/add-player-form"
import { playerTableStyles, playerTableGridStyles } from "../shared-styles"

const managePageStyles = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
`

const playerDisplayStyles = css`
  ${playerTableStyles};
  ${playerTableGridStyles};
  grid-template-columns: 1fr auto auto auto;
`

export default function ManagePlayers() {
  const players = store.useState(s => s.players)

  return (
    <div css={managePageStyles} data-testid="manage-players-page">
      <div css={playerDisplayStyles}>
        {players.map((player, index) => (
          <EditPlayerRow key={player.name} index={index} />
        ))}
      </div>
      <AddPlayerForm />
    </div>
  )
}
