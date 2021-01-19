/** @jsxImportSource @emotion/react */

import "@fortawesome/fontawesome-pro/css/all.css"
import { css } from "@emotion/react/macro"
import { store, Mode } from "../pullstate"
import PlayersTable from "./players-table"
import ActionBar from "./action-bar"
import AddPlayer from "./add-player"

const scoreStyles = css`
  padding: 15px;
  font-size: 2rem;
`

export default function Page() {
  const mode = store.useState(s => s.mode)

  function renderScore() {
    if (mode === Mode.SCORE) {
      return (
        <div css={scoreStyles}>
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
        </div>
      )
    }
  }

  function renderAddPlayer() {
    if (mode === Mode.ADD_PLAYER) return <AddPlayer />
  }

  return (
    <>
      {renderScore()}
      {renderAddPlayer()}
    </>
  )
}
