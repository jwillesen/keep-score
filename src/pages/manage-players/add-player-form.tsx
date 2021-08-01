/** @jsxImportSource @emotion/react */
import { KeyboardEventHandler, useRef } from "react"
import { css } from "@emotion/react/macro"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"
import Icon from "../../components/icon"
import SrOnly from "../../components/sr-only"
import { store } from "../../store"

export default function AddPlayerForm() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAdd = () => {
    if (inputRef.current) {
      store.update(s => {
        s.players.push({
          name: inputRef.current!.value,
          score: 0,
          scoreModifier: 0,
          active: s.players.length === 0,
        })
      })
      inputRef.current.value = ""
    }
  }

  const handleInputKey: KeyboardEventHandler = e => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAdd()
    }
  }

  const renderAdornment = () => {
    return (
      <InputAdornment position="end">
        <IconButton onClick={handleAdd}>
          <Icon name="user-plus" />
          <SrOnly>Add player</SrOnly>
        </IconButton>
      </InputAdornment>
    )
  }

  return (
    <div
      css={css`
        margin-top: 10px;
        display: flex;
        align-items: center;
      `}
    >
      <TextField
        id="add-player-text-field"
        inputRef={inputRef}
        fullWidth
        placeholder="Enter new player name"
        label="Player name"
        variant="outlined"
        InputProps={{
          endAdornment: renderAdornment(),
        }}
        onKeyDown={handleInputKey}
      />
    </div>
  )
}
