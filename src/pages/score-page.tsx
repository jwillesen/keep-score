import PlayersTable from "./score-page/players-table"
import ActionBar from "./score-page/action-bar"
import ScoreGrid from "./score-page/score-grid"

export default function ScorePage() {
  return (
    <div data-testid="score-page">
      <PlayersTable />
      <ActionBar />
      <ScoreGrid />
    </div>
  )
}
