import { store, State } from "../../pullstate"
import { fireEvent, render, screen } from "@testing-library/react"
import Page from "../page"

const initialState: State = {
  players: [
    { name: "Amanda", score: 42, active: false },
    { name: "Beth", score: 8, active: true },
    { name: "Céline", score: 0, active: false },
    { name: "Diane", score: 3, active: false },
  ],
}

describe("Keep Score", () => {
  describe("Players", () => {
    beforeEach(() => {
      store.update(s => (s = initialState))
    })

    it("displays the active player", () => {
      render(<Page />)
      expect(
        screen.getByText("active").closest("div")?.nextSibling?.textContent
      ).toBe("Beth")
      expect(screen.getAllByText("not active")).toHaveLength(
        initialState.players.length - 1
      )
    })

    it("can change the active player", () => {
      render(<Page />)
      fireEvent.click(screen.getByText("Diane"))
      const players = store.getRawState().players
      expect(players.map(p => p.active)).toEqual([false, false, false, true])
    })
  })
})
