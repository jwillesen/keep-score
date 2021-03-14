/** @jsxImportSource @emotion/react */

import "@fortawesome/fontawesome-pro/css/all.css"
import { css } from "@emotion/react/macro"
import { StylesProvider } from "@material-ui/core/styles"
import { store, Mode } from "../store"
import PageHeader from "./page-header"
import PageFooter from "./page-footer"
import PlayersTable from "./players-table"
import ActionBar from "./action-bar"
import ScoreGrid from "./score-grid"
import AddPlayer from "./add-player"
import ManagePlayers from "../pages/manage-players"

const pageStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 15px;
  font-size: 2rem;
  max-width: 540px;
`

const contentStyles = css`
  flex: 1;
`

export default function Page() {
  const mode = store.useState(s => s.mode)

  function renderScore() {
    if (mode === Mode.Score) {
      return (
        <div data-testid="score-page">
          <PlayersTable />
          <ActionBar />
          <ScoreGrid />
        </div>
      )
    }
  }

  function renderAddPlayer() {
    if (mode === Mode.AddPlayer) return <AddPlayer />
  }

  function renderManagePlayers() {
    if (mode === Mode.ManagePlayers) return <ManagePlayers />
  }

  function renderSettings() {
    if (mode === Mode.Settings)
      return <div data-testid="settings-page">Settings</div>
  }

  return (
    <StylesProvider injectFirst>
      <div css={pageStyles}>
        <PageHeader />
        <div css={contentStyles}>
          {renderScore()}
          {renderManagePlayers()}
          {renderSettings()}
        </div>
        <PageFooter />
      </div>
    </StylesProvider>
  )
}
