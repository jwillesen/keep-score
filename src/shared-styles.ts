import { css } from "@emotion/react/macro"

export const playerTableStyles = css`
  border: 1px solid black;
  border-radius: 8px;
  padding: 20px;
`

export const playerNameStyles = css`
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
`

export const playerTableGridStyles = css`
  display: grid;
  gap: 0.2em;
  grid-auto-rows: min-content;
  align-items: center;
`
