/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro"
import React from "react"
import { store, Player } from "../../store"
import Icon from "../../components/icon"
import SrOnly from "../../components/sr-only"
import {
  playerTableStyles,
  playerTableGridStyles,
  playerNameStyles,
} from "../../shared-styles"

const gridStyles = css`
  ${playerTableStyles};
  ${playerTableGridStyles};
  grid-template-columns: 1.2em 1fr minmax(1.2em, auto);
`

const activeStyles = css`
  display: flex;
  align-items: center;
`

// make empty div big enough to click
const emptyActiveStyles = css`
  width: 100%;
  height: 100%;
`

const scoreStyles = css`
  justify-self: end;
`

export default function PlayersTable() {
  const players = store.useState(s => s.players)

  function playerClicked(player: Player) {
    store.update(s => {
      s.players.forEach(p => {
        if (p.name === player.name) p.active = true
        else p.active = false
        p.score += p.scoreModifier
        p.scoreModifier = 0
      })
    })
  }

  function renderActivePlayer(player: Player) {
    const styles = [activeStyles]
    if (!player.active) styles.push(emptyActiveStyles)
    return (
      <div css={styles} onClick={() => playerClicked(player)}>
        {player.active && <Icon name="arrow-right" />}
        <SrOnly>{player.active ? "active" : "not active"}</SrOnly>
      </div>
    )
  }

  function renderScore(player: Player) {
    return (
      <div css={scoreStyles} onClick={() => playerClicked(player)}>
        {player.score} {player.scoreModifier > 0 ? "+" : ""}
        {player.scoreModifier === 0 ? null : player.scoreModifier}
      </div>
    )
  }

  function playerRow(player: Player) {
    return (
      <React.Fragment key={player.name}>
        {renderActivePlayer(player)}
        <div
          data-player={player.name}
          css={playerNameStyles}
          onClick={() => playerClicked(player)}
        >
          {player.name}
        </div>
        {renderScore(player)}
      </React.Fragment>
    )
  }

  return <div css={gridStyles}>{players.map(p => playerRow(p))}</div>
}
