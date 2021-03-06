import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { store, State, Mode } from "../../store"
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
    store.replace(initialState())
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
    describe("adding players", () => {
      it("initially sets the focus to the input", () => {
        render(<Page />)
        userEvent.click(screen.getByText(/add player/i))
        expect(document.activeElement).toBe(
          screen.getByLabelText(/player name/i)
        )
      })

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

    describe("removing a player", () => {
      it("removes the active player", () => {
        render(<Page />)
        userEvent.click(screen.getByText(/remove active player/i))
        expect(store.getRawState().players.map(p => p.name)).toEqual([
          "Amanda",
          "Céline",
          "Diane",
        ])
      })

      it("does nothing if there are no players", () => {
        store.update(s => {
          s.players = []
        })
        render(<Page />)
        expect(() =>
          userEvent.click(screen.getByText(/remove active player/i))
        ).not.toThrow()
      })

      it("makes the next player the active player if there is one", () => {
        render(<Page />)
        userEvent.click(screen.getByText(/remove active player/i))
        expect(store.getRawState().players[1].active).toBeTruthy()
      })

      it("makes the previous player the active player if removing the last one", () => {
        store.update(s => {
          s.players[1].active = false
          s.players[3].active = true
        })
        render(<Page />)
        userEvent.click(screen.getByText(/remove active player/i))
        expect(store.getRawState().players[2].active).toBeTruthy()
      })

      it("can delete the last player", () => {
        store.update(s => {
          s.players.splice(0, 3)
          s.players[0].active = true
        })
        render(<Page />)
        userEvent.click(screen.getByText(/remove active player/i))
        expect(store.getRawState().players).toHaveLength(0)
      })
    })

    describe("moving players", () => {
      it("can move the active player up", () => {
        render(<Page />)
        userEvent.click(screen.getByText(/move.*up/i))
        expect(store.getRawState().players.map(p => p.name)).toEqual([
          "Beth",
          "Amanda",
          "Céline",
          "Diane",
        ])
        expect(store.getRawState().players[0].active).toBeTruthy()
      })

      it("moving up does nothing if the active player is at the top", () => {
        store.update(s => {
          s.players[1].active = false
          s.players[0].active = true
        })
        render(<Page />)
        userEvent.click(screen.getByText(/move.*up/i))
        expect(store.getRawState().players.map(p => p.name)).toEqual([
          "Amanda",
          "Beth",
          "Céline",
          "Diane",
        ])
      })

      it("can move the active player down", () => {
        render(<Page />)
        userEvent.click(screen.getByText(/move.*down/i))
        expect(store.getRawState().players.map(p => p.name)).toEqual([
          "Amanda",
          "Céline",
          "Beth",
          "Diane",
        ])
        expect(store.getRawState().players[2].active).toBeTruthy()
      })

      it("moving down does nothing if the active player is at the bottom", () => {
        store.update(s => {
          s.players[1].active = false
          s.players[3].active = true
        })
        render(<Page />)
        userEvent.click(screen.getByText(/move.*down/i))
        expect(store.getRawState().players.map(p => p.name)).toEqual([
          "Amanda",
          "Beth",
          "Céline",
          "Diane",
        ])
      })

      it("does nothing if there are no players", () => {
        store.update(s => {
          s.players = []
        })
        render(<Page />)
        expect(() =>
          userEvent.click(screen.getByText(/move.*up/i))
        ).not.toThrow()
        expect(() =>
          userEvent.click(screen.getByText(/move.*down/i))
        ).not.toThrow()
      })
    })

    describe("reset scores", () => {
      it("sets all player scores to 0", () => {
        render(<Page />)
        userEvent.click(screen.getByText(/reset scores/i))
        expect(
          store.getRawState().players.every(p => p.score === 0)
        ).toBeTruthy()
      })
    })
  })

  describe("adding scores", () => {
    it("adds to active player's score", () => {
      render(<Page />)
      userEvent.click(screen.getByText("+1"))
      expect(screen.getByText("9")).toBeInTheDocument()
      expect(store.getRawState().players[1].score).toBe(9)
    })

    it("subtracts from the active player's score", () => {
      render(<Page />)
      userEvent.click(screen.getByText("-2"))
      expect(screen.getByText("6")).toBeInTheDocument()
      expect(store.getRawState().players[1].score).toBe(6)
    })

    it("does nothing if there are no players", () => {
      store.update(s => {
        s.players = []
      })
      render(<Page />)
      expect(() => userEvent.click(screen.getByText("+1"))).not.toThrow()
    })
  })
})
