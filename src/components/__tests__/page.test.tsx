import { store, State } from "../../pullstate"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Mode } from "../../pullstate"
import Page from "../page"

function initialState(): State {
  return {
    mode: Mode.SCORE,
    players: [
      { name: "Amanda", score: 42, active: false },
      { name: "Beth", score: 8, active: true },
      { name: "Céline", score: 0, active: false },
      { name: "Diane", score: 3, active: false },
    ],
  }
}

describe("Keep Score", () => {
  beforeEach(() => {
    store.update(s => (s = initialState()))
  })

  describe("player list", () => {
    it("displays the active player", () => {
      const initial = initialState()
      render(<Page />)
      expect(
        screen.getByText("active").closest("div")?.nextSibling?.textContent
      ).toBe("Beth")
      expect(screen.getAllByText("not active")).toHaveLength(
        initial.players.length - 1
      )
    })

    it("can change the active player by clicking a player row", () => {
      render(<Page />)
      userEvent.click(screen.getByText("Diane"))
      const players = store.getRawState().players
      expect(players.map(p => p.active)).toEqual([false, false, false, true])
    })

    it.todo("sr button for setting the active player")
  })

  describe("action bar", () => {
    describe("adding a player", () => {
      it("adds a new player below the active player", () => {
        render(<Page />)
        userEvent.click(screen.getByText(/add player/i))
        userEvent.type(screen.getByLabelText(/player name/i), "Edith")
        userEvent.click(screen.getByText(/add player/i))
        expect(store.getRawState().players).toEqual([
          { name: "Amanda", score: 42, active: false },
          { name: "Beth", score: 8, active: false },
          { name: "Edith", score: 0, active: true },
          { name: "Céline", score: 0, active: false },
          { name: "Diane", score: 3, active: false },
        ])
        expect(screen.getByText("Keep Score")).toBeInTheDocument()
      })

      it("can add a new player when there are no players currently", () => {
        store.update(s => {
          s.players = []
        })
        render(<Page />)
        userEvent.click(screen.getByText(/add player/i))
        userEvent.type(screen.getByLabelText(/player name/i), "Tina")
        userEvent.click(screen.getByText(/add player/i))
        expect(store.getRawState().players).toEqual([
          { name: "Tina", score: 0, active: true },
        ])
      })

      it("can cancel adding a player", () => {
        render(<Page />)
        userEvent.click(screen.getByText(/add player/i))
        userEvent.click(screen.getByText(/cancel/i))
        expect(screen.getByText("Keep Score")).toBeInTheDocument()
      })
    })

    // describe("removing a player", () => {
    //   render(<Page />)
    //   userEvent.click(screen.getByText(/remove active player/i))
    //   expect(store.getRawState().players.map(p => p.name)).toEqual([
    //     "Amanda",
    //     "Céline",
    //     "Diane",
    //   ])
    // })
  })
})
