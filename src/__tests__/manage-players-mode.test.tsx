import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Mode, store } from "../store"
import Page from "../components/page"
import { restoreState, initialState } from "../test-utils"

import { shuffle } from "../utils"
jest.mock("../utils")

describe("Manage Players Mode", () => {
  store.replace(initialState({ mode: Mode.ManagePlayers }))
  beforeEach(restoreState())

  it("shows the list of players", () => {
    render(<Page />)
    store.getRawState().players.forEach(player => {
      expect(screen.getByText(player.name)).toBeInTheDocument()
    })
  })

  it("moves a player up", () => {
    render(<Page />)
    const upButtons = screen.getAllByText("Move player up")
    userEvent.click(upButtons[0])
    expect(store.getRawState().players.map(p => p.name)).toEqual([
      "Beth",
      "Amanda",
      "Céline",
      "Diane",
    ])
  })

  it("moves a player down", () => {
    render(<Page />)
    const downButtons = screen.getAllByText("Move player down")
    userEvent.click(downButtons[downButtons.length - 1])
    expect(store.getRawState().players.map(p => p.name)).toEqual([
      "Amanda",
      "Beth",
      "Diane",
      "Céline",
    ])
  })

  it("can remove a player", () => {
    render(<Page />)
    const removeButtons = screen.getAllByText("Remove player")
    userEvent.click(removeButtons[2])
    expect(store.getRawState().players.map(p => p.name)).toEqual([
      "Amanda",
      "Beth",
      "Diane",
    ])
  })

  it("adds a new player to the bottom", () => {
    render(<Page />)
    userEvent.type(screen.getByLabelText("Player name"), "Edith")
    userEvent.click(screen.getByText("Add player"))
    expect(store.getRawState().players.map(p => p.name)).toEqual([
      "Amanda",
      "Beth",
      "Céline",
      "Diane",
      "Edith",
    ])
    userEvent.type(screen.getByLabelText("Player name"), "Fiona{enter}")
    const s = store.getRawState()
    expect(s.players[s.players.length - 1].name).toBe("Fiona")
  })

  it("can randomize player order", () => {
    ;(shuffle as jest.Mock).mockImplementation(a => a.reverse())
    render(<Page />)
    userEvent.click(screen.getByText("Action Menu"))
    userEvent.click(screen.getByText("Randomize players"))
    expect(store.getRawState().players.map(p => p.name)).toEqual([
      "Diane",
      "Céline",
      "Beth",
      "Amanda",
    ])
  })

  it("can clear all players", () => {
    render(<Page />)
    userEvent.click(screen.getByText("Action Menu"))
    userEvent.click(screen.getByText("Remove all"))
    expect(store.getRawState().players).toHaveLength(0)
  })
})
