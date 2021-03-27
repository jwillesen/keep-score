/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro"
import PlayersTable from "./score-page/players-table"
import ActionBar from "./score-page/action-bar"
import ScoreGrid from "./score-page/score-grid"

const scorePageStyles = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export default function ScorePage() {
  return (
    <div css={scorePageStyles} data-testid="score-page">
      <PlayersTable />
      <ActionBar />
      <ScoreGrid />
    </div>
  )
}
