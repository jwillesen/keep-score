/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react/macro"
import ScoreButton from "./score-button"

const buttonRowStyles = css`
  display: flex;
  justify-content: space-evenly;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px solid black;
`

export default function ScoreGrid() {
  return (
    <>
      <div css={buttonRowStyles}>
        <ScoreButton scoreModifier={1} />
        <ScoreButton scoreModifier={2} />
        <ScoreButton scoreModifier={5} />
        <ScoreButton scoreModifier={20} />
      </div>
      <div css={buttonRowStyles}>
        <ScoreButton scoreModifier={-1} />
        <ScoreButton scoreModifier={-2} />
        <ScoreButton scoreModifier={-5} />
        <ScoreButton scoreModifier={-20} />
      </div>
    </>
  )
}
