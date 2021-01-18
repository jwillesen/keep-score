/** @jsxImportSource @emotion/react */

import "@fortawesome/fontawesome-pro/css/all.css"
import PlayersTable from "./players-table"

export default function Page() {
  return (
    <>
      <h1 css={{ textAlign: "center" }}>Keep Score</h1>
      <PlayersTable />
    </>
  )
}
