/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro"
import { Mode, store } from "../pullstate"
import Icon from "./icon"
import SrOnly from "./sr-only"

const actionWrapperStyles = css`
  display: flex;
  justify-content: flex-end;
`

const actionButtonStyles = css`
  background-color: white;
  border: none;
  font-size: 1em;
  margin: 8px;
  padding: 0;
`

export default function ActionBar() {
  // const players = store.useState(s => s.players)

  // function removePlayer() {
  //   const doomedIndex = players.findIndex(p => p.active)
  //   if (doomedIndex < 0) return
  //   store.update(s => {
  //     s.players.splice(doomedIndex, 1)
  //   })
  // }

  return (
    <div css={actionWrapperStyles}>
      <button
        type="button"
        css={actionButtonStyles}
        onClick={() =>
          store.update(s => {
            s.mode = Mode.ADD_PLAYER
          })
        }
      >
        <Icon name="plus" />
        <SrOnly>Add Player</SrOnly>
      </button>
      <button type="button" css={actionButtonStyles}>
        <Icon name="minus" />
        <SrOnly>Remove Active Player</SrOnly>
      </button>
      <button type="button" css={actionButtonStyles}>
        <Icon name="arrow-up" />
        <SrOnly>Move active player up</SrOnly>
      </button>
      <button type="button" css={actionButtonStyles}>
        <Icon name="arrow-down" />
        <SrOnly>Move active player down</SrOnly>
      </button>
      <button type="button" css={actionButtonStyles}>
        <Icon name="gear" />
        <SrOnly>Settings</SrOnly>
      </button>
    </div>
  )
}
