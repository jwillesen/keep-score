import { render, screen } from "@testing-library/react"
import { Mode, store } from "../../store"
import Page from "../page"
import { restoreState, initialState } from "../test-utils"

describe("Manage Players Mode", () => {
  store.replace(initialState({ mode: Mode.ManagePlayers }))
  beforeEach(restoreState())

  it("shows the list of players", () => {
    render(<Page />)
    store.getRawState().players.forEach(player => {
      expect(screen.getByText(player.name)).toBeInTheDocument()
    })
  })

  it.todo("moves a player up")
  it.todo("top player has no move up button")
  it.todo("moves a player down")
  it.todo("bottom player has no move down button")

  it.todo("can remove a player")

  it.todo("adds a new player to the bottom")
  it.todo("can randomize player order")
  it.todo("can clear all players")
})
