/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react/macro"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import { store, Mode } from "../store"
import Icon from "./icon"

const navStyles = css`
  margin-top: 10px;
`

const actionStyles = css`
  --normalSize: 1.25rem;
  --selectedSize: 1.5rem;

  font-size: var(--normalSize);
  // transition copied from Mui so it applies to the icon and not just the label
  transition: font-size 0.2s, opacity 0.2s;
  transition-delay: 0.1s;

  &.Mui-selected {
    font-size: var(--selectedSize);
  }

  // Have to override these
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
    <BottomNavigation
      css={navStyles}
      value={mode}
      showLabels
      onChange={handleChange}
    >
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
