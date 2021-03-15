import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { store, State, Mode } from "../../store"
import Page from "../page"
import { act } from "react-dom/test-utils"

function initialState(): State {
  return {
    mode: Mode.Score,
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

  describe("bottom navigation", () => {
    it("changes views", () => {
      render(<Page />)
      userEvent.click(screen.getByText("Players"))
      expect(screen.getByTestId("manage-players-page")).toBeInTheDocument()

      userEvent.click(screen.getByText("Score"))
      expect(screen.getByTestId("score-page")).toBeInTheDocument()

      userEvent.click(screen.getByText("Settings"))
      expect(screen.getByTestId("settings-page")).toBeInTheDocument()
    })
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

  describe("action menu", () => {
    it("resets the scores", () => {
      render(<Page />)
      userEvent.click(screen.getByText("Action Menu"))
      userEvent.click(screen.getByText("Reset Scores"))
      expect(store.getRawState().players.every(p => p.score === 0)).toBeTruthy()
    })
  })

  describe("action bar", () => {
    function getActivePlayerName() {
      for (let player of store.getRawState().players) {
        if (player.active) return player.name
      }
    }

    function setActivePlayer(name: string) {
      act(() => {
        store.update(s => {
          s.players.forEach(p => {
            p.active = p.name === name
          })
        })
      })
    }

    it("moves to the next player", () => {
      render(<Page />)
      setActivePlayer("Amanda")
      userEvent.click(screen.getByText("Next Player"))
      expect(getActivePlayerName()).toBe("Beth")
    })

    it("moves to the first player when it needs to wrap", () => {
      render(<Page />)
      setActivePlayer("Diane")
      userEvent.click(screen.getByText("Next Player"))
      expect(getActivePlayerName()).toBe("Amanda")
    })

    it("moves to the previous player", () => {
      render(<Page />)
      setActivePlayer("Beth")
      userEvent.click(screen.getByText("Previous Player"))
      expect(getActivePlayerName()).toBe("Amanda")
    })

    it("previous player moves to last player when it needs to wrap", () => {
      render(<Page />)
      setActivePlayer("Amanda")
      userEvent.click(screen.getByText("Previous Player"))
      expect(getActivePlayerName()).toBe("Diane")
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
