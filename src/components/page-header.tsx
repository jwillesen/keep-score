/** @jsxImportSource @emotion/react */

import React, { useState } from "react"
import { useTheme } from "@material-ui/core/styles"
import { css } from "@emotion/react/macro"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import SrOnly from "./sr-only"
import Icon from "../components/icon"
import { store, Mode } from "../store"

export default function PageHeader() {
  const currentMode = store.useState(s => s.mode)
  const theme = useTheme()
  const [buttonElt, setButtonElt] = useState<HTMLButtonElement | null>(null)

  const handleMenuClick: React.ReactEventHandler<HTMLButtonElement> = e => {
    setButtonElt(e.currentTarget)
  }

  const handleClose = () => {
    setButtonElt(null)
  }

  const handleManagePlayers = () => {
    store.update(s => {
      s.mode = Mode.ManagePlayers
    })
    handleClose()
  }

  const handlePlay = () => {
    store.update(s => {
      s.mode = Mode.Score
    })
    handleClose()
  }

  const handleSettings = () => {
    store.update(s => {
      s.mode = Mode.Settings
    })
    handleClose()
  }

  return (
    <>
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
        <IconButton
          color="inherit"
          edge="end"
          aria-controls="settings-menu"
          aria-haspopup
          onClick={handleMenuClick}
        >
          <SrOnly>Settings Menu</SrOnly>
          <Icon name="gear" />
        </IconButton>
      </div>
      <Menu
        id="settings-menu"
        open={buttonElt !== null}
        anchorEl={buttonElt}
        variant="menu"
        onClose={handleClose}
        css={css`
          .MuiMenuItem-root.Mui-selected {
            background-color: ${theme.palette.primary.main};
            color: ${theme.palette.primary.contrastText};
            & .MuiListItemIcon-root {
              color: ${theme.palette.primary.contrastText};
            }
          }
          .MuiMenuItem-root:hover,
          .MuiMenuItem-root.Mui-selected:hover {
            background-color: ${theme.palette.primary.light};
            color: ${theme.palette.primary.contrastText};
            & .MuiListItemIcon-root {
              color: ${theme.palette.primary.contrastText};
            }
          }
        `}
      >
        <MenuItem
          selected={currentMode === Mode.ManagePlayers}
          onClick={handleManagePlayers}
        >
          <ListItemIcon>
            <Icon name="users" />
          </ListItemIcon>
          Manage Players
        </MenuItem>
        <MenuItem selected={currentMode === Mode.Score} onClick={handlePlay}>
          <ListItemIcon>
            <Icon name="play" />
          </ListItemIcon>
          Score Game
        </MenuItem>
        <MenuItem
          selected={currentMode === Mode.Settings}
          onClick={handleSettings}
        >
          <ListItemIcon>
            <Icon name="gear" />
          </ListItemIcon>
          Settings
        </MenuItem>
      </Menu>
    </>
  )
}
