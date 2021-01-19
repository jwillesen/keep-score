/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react/macro"
import ScoreButton from "./score-button"

const buttonRowStyles = css`
  display: flex;
  justify-content: space-evenly;
  margin-top: 16px;
`

export default function ScoreGrid() {
  return (
    <>
      <hr />
      <div css={buttonRowStyles}>
        <ScoreButton scoreModifier={1} />
        <ScoreButton scoreModifier={2} />
        <ScoreButton scoreModifier={3} />
      </div>
      <div css={buttonRowStyles}>
        <ScoreButton scoreModifier={5} />
        <ScoreButton scoreModifier={10} />
      </div>
      <hr />
      <div css={buttonRowStyles}>
        <ScoreButton scoreModifier={-1} />
        <ScoreButton scoreModifier={-2} />
        <ScoreButton scoreModifier={-3} />
      </div>
      <div css={buttonRowStyles}>
        <ScoreButton scoreModifier={-5} />
        <ScoreButton scoreModifier={-10} />
      </div>
    </>
  )
}
