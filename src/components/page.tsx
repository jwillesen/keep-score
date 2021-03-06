/** @jsxImportSource @emotion/react */

import "@fortawesome/fontawesome-pro/css/all.css"
import { css } from "@emotion/react/macro"
import { store, Mode } from "../store"
import PlayersTable from "./players-table"
import ActionBar from "./action-bar"
import ScoreGrid from "./score-grid"
import AddPlayer from "./add-player"

const pageStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 15px;
  font-size: 2rem;
  max-width: 540px;
`

export default function Page() {
  const mode = store.useState(s => s.mode)

  function renderScore() {
    if (mode === Mode.SCORE) {
      return (
        <>
          <h1
            css={css`
              margin: 0;
              margin-bottom: 10px;
              font-size: 3rem;
              text-align: center;
            `}
          >
            Keep Score
          </h1>
          <PlayersTable />
          <ActionBar />
          <ScoreGrid />
        </>
      )
    }
  }

  function renderAddPlayer() {
    if (mode === Mode.ADD_PLAYER) return <AddPlayer />
  }

  return (
    <div css={pageStyles}>
      {renderScore()}
      {renderAddPlayer()}
    </div>
  )
}
