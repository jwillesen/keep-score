/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro"
import useTheme from "@material-ui/core/styles/useTheme"
import IconButton from "@material-ui/core/IconButton"
import Icon from "../../components/icon"
import SrOnly from "../../components/sr-only"
import { playerNameStyles } from "../../shared-styles"
import { store } from "../../store"

interface Props {
  index: number
}

export default function EditPlayerRow({ index }: Props) {
  const theme = useTheme()
  const players = store.useState(s => s.players)

  const moveUp = () => {
    store.update(s => {
      const thisPlayer = s.players[index]
      const abovePlayer = s.players[index - 1]
      s.players[index - 1] = thisPlayer
      s.players[index] = abovePlayer
    })
  }

  const moveDown = () => {
    store.update(s => {
      const thisPlayer = s.players[index]
      const belowPlayer = s.players[index + 1]
      s.players[index + 1] = thisPlayer
      s.players[index] = belowPlayer
    })
  }

  const removePlayer = () => {
    store.update(s => {
      s.players.splice(index, 1)
    })
  }

  return (
    <>
      <div css={playerNameStyles}>{players[index].name}</div>
      <div>
        {index > 0 && (
          <IconButton onClick={moveUp}>
            <Icon name="arrow-up" />
            <SrOnly>Move player up</SrOnly>
          </IconButton>
        )}
      </div>
      <div>
        {index < players.length - 1 && (
          <IconButton onClick={moveDown}>
            <Icon name="arrow-down" />
            <SrOnly>Move player down</SrOnly>
          </IconButton>
        )}
      </div>
      <IconButton
        onClick={removePlayer}
        css={css`
          color: ${theme.palette.error.main};
        `}
      >
        <Icon name="trash-can" />
        <SrOnly>Remove player</SrOnly>
      </IconButton>
    </>
  )
}
