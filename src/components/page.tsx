/** @jsxImportSource @emotion/react */

import "@fortawesome/fontawesome-pro/css/all.css"
import { css } from "@emotion/react/macro"
import { StylesProvider } from "@material-ui/core/styles"
import { store, Mode } from "../store"
import PageHeader from "./page-header"
import PageFooter from "./page-footer"
import ManagePlayers from "../pages/manage-players"
import ScorePage from "../pages/score-page"
import SettingsPage from "../pages/settings-page"

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
    if (mode === Mode.Score) return <ScorePage />
  }

  function renderManagePlayers() {
    if (mode === Mode.ManagePlayers) return <ManagePlayers />
  }

  function renderSettings() {
    if (mode === Mode.Settings) return <SettingsPage />
  }

  return (
    <StylesProvider injectFirst>
      <div css={pageStyles}>
        <PageHeader />
        {renderScore()}
        {renderManagePlayers()}
        {renderSettings()}
        <PageFooter />
      </div>
    </StylesProvider>
  )
}
