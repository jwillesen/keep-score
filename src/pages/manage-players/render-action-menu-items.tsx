/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import Icon from "../../components/icon"
import { store } from "../../store"
import { shuffle } from "../../utils"

interface Props {
  theme: Theme
  onAction: () => void
}

export default function renderManagePlayersMenuItems({
  theme,
  onAction,
}: Props) {
  const handleRandomizePlayers = () => {
    store.update(s => {
      shuffle(s.players)
      s.players.forEach((p, i) => {
        p.active = i === 0
      })
    })
    onAction()
  }

  const handleClearAll = () => {
    store.update(s => {
      s.players = []
    })
    onAction()
  }

  return [
    <MenuItem key="randomize" onClick={handleRandomizePlayers}>
      <ListItemIcon>
        <Icon name="dice" />
      </ListItemIcon>
      Randomize players
    </MenuItem>,

    <MenuItem
      key="clear"
      css={css`
        color: ${theme.palette.error.main};
      `}
      onClick={handleClearAll}
    >
      <ListItemIcon
        css={css`
          color: ${theme.palette.error.main};
        `}
      >
        <Icon name="user-xmark" />
      </ListItemIcon>
      Remove all
    </MenuItem>,
  ]
}
