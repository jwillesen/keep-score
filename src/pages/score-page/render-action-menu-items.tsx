/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import Icon from "../../components/icon"
import { store } from "../../store"

interface Props {
  theme: Theme
  onAction: () => void
}

export default function renderScoreMenuItems({ theme, onAction }: Props) {
  const handleReset = () => {
    store.update(s => {
      s.players.forEach(p => (p.score = 0))
    })
    onAction()
  }

  return [
    <MenuItem
      key="reset"
      css={css`
        color: ${theme.palette.error.main};
      `}
      onClick={handleReset}
    >
      <ListItemIcon
        css={css`
          color: ${theme.palette.error.main};
        `}
      >
        <Icon name="trash-undo" />
      </ListItemIcon>
      Reset Scores
    </MenuItem>,
  ]
}
