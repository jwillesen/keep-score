/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react/macro"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import { store, Mode } from "../store"
import Icon from "./icon"

const actionStyles = css`
  --normalSize: 1.25rem;
  --selectedSize: 1.5rem;

  font-size: var(--normalSize);

  &.Mui-selected {
    font-size: var(--selectedSize);
  }

  .MuiBottomNavigationAction-label {
    font-size: var(--normalSize);
  }
  .MuiBottomNavigationAction-label.Mui-selected {
    font-size: var(--selectedSize);
  }
`

export default function PageFooter() {
  const mode = store.useState(s => s.mode)
  const handleChange = (e: any, newMode: Mode) => {
    store.update(s => {
      s.mode = newMode
    })
  }

  return (
    <BottomNavigation value={mode} showLabels onChange={handleChange}>
      <BottomNavigationAction
        css={actionStyles}
        label="Players"
        value={Mode.ManagePlayers}
        icon={<Icon name="user-pen" />}
      />
      <BottomNavigationAction
        css={actionStyles}
        label="Score"
        value={Mode.Score}
        icon={<Icon name="play" />}
      />
      <BottomNavigationAction
        css={actionStyles}
        label="Settings"
        value={Mode.Settings}
        icon={<Icon name="gear" />}
      />
    </BottomNavigation>
  )
}
