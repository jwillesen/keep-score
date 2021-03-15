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
import { store } from "../store"

export default function PageHeader() {
  const theme = useTheme()
  const [buttonElt, setButtonElt] = useState<HTMLButtonElement | null>(null)

  const handleMenuClick: React.ReactEventHandler<HTMLButtonElement> = e => {
    setButtonElt(e.currentTarget)
  }

  const handleClose = () => {
    setButtonElt(null)
  }

  const handleReset = () => {
    store.update(s => {
      s.players.forEach(p => (p.score = 0))
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
          aria-controls="action-menu"
          aria-haspopup
          onClick={handleMenuClick}
        >
          <SrOnly>Action Menu</SrOnly>
          <Icon name="ellipsis" />
        </IconButton>
      </div>
      <Menu
        id="action-menu"
        open={buttonElt !== null}
        anchorEl={buttonElt}
        variant="menu"
        onClose={handleClose}
        css={css`
          .MuiMenuItem-root {
            font-size: 2rem;
          }

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
        <MenuItem onClick={handleReset}>
          <ListItemIcon>
            <Icon name="trash-undo" />
          </ListItemIcon>
          Reset Scores
        </MenuItem>
      </Menu>
    </>
  )
}
