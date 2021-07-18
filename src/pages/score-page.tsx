/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro"
import PlayersTable from "./score-page/players-table"
import ActionBar from "./score-page/action-bar"
import ScoreGrid from "./score-page/score-grid"

const scorePageStyles = css`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
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
