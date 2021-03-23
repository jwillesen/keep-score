/** @jsxImportSource @emotion/react */

import React, { useState } from "react"
import { useTheme } from "@material-ui/core/styles"
import { css } from "@emotion/react/macro"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import { Mode, store } from "../store"
import renderScoreMenuItems from "../pages/score-page/render-action-menu-items"
import renderManagePlayersMenuItems from "../pages/manage-players/render-action-menu-items"
import SrOnly from "./sr-only"
import Icon from "../components/icon"

const menuStyles = css`
  .MuiMenuItem-root {
    font-size: 1.5rem;
  }
`

export default function PageHeader() {
  const theme = useTheme()
  const mode = store.useState(s => s.mode)
  const [buttonElt, setButtonElt] = useState<HTMLButtonElement | null>(null)

  const handleMenuClick: React.ReactEventHandler<HTMLButtonElement> = e => {
    setButtonElt(e.currentTarget)
  }

  const handleClose = () => {
    setButtonElt(null)
  }

  const renderMenuItems = () => {
    switch (mode) {
      case Mode.ManagePlayers:
        return renderManagePlayersMenuItems({ theme, onAction: handleClose })
      case Mode.Score:
        return renderScoreMenuItems({ theme, onAction: handleClose })
      default:
        return null
    }
  }

  const menuItems = renderMenuItems()
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      `}
    >
      <h1
        css={css`
          margin: 0;
          font-size: 3rem;
        `}
      >
        Keep Score
      </h1>
      {menuItems && (
        <>
          <IconButton
            color="inherit"
            edge="end"
            aria-controls="action-menu"
            aria-haspopup
            onClick={handleMenuClick}
          >
            <SrOnly>Action Menu</SrOnly>
            <Icon name="ellipsis" />
          </IconButton>
          <Menu
            id="action-menu"
            open={buttonElt !== null}
            anchorEl={buttonElt}
            variant="menu"
            onClose={handleClose}
            css={menuStyles}
          >
            {menuItems}
          </Menu>
        </>
      )}
    </div>
  )
}
