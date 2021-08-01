import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Mode, store } from "../store"
import Page from "../components/page"
import { restoreState, initialState } from "../test-utils"

describe("Score Mode", () => {
  store.replace(initialState({ mode: Mode.Score }))
  beforeEach(restoreState())

  describe("player list", () => {
    it("displays the active player", () => {
      const initial = store.getRawState()
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

    it("displays score modifiers", () => {
      store.update(s => {
        s.players[0].scoreModifier = 42
      })
      render(<Page />)
      expect(screen.getByText(/\+42/)).toBeInTheDocument()
    })

    it("collapses score modifiers when the player is clicked", () => {
      const modifier = 42
      store.update(s => {
        s.players[0].scoreModifier = modifier
      })
      render(<Page />)
      userEvent.click(screen.getByText("Amanda"))
      expect(store.getRawState().players[0].score).toBe(
        initialState().players[0].score + modifier
      )
      expect(store.getRawState().players[0].scoreModifier).toBe(0)
    })

    it("collapses score modifiers when any player is clicked", () => {
      const modifier = 42
      store.update(s => {
        s.players[1].scoreModifier = modifier
      })
      render(<Page />)
      userEvent.click(screen.getByText("Diane"))
      expect(store.getRawState().players[1].score).toBe(
        initialState().players[1].score + modifier
      )
      expect(store.getRawState().players[1].scoreModifier).toBe(0)
    })

    it("collapses score modifiers when the next button is clicked", () => {
      const modifier = 42
      store.update(s => {
        s.players[0].scoreModifier = modifier
      })
      render(<Page />)
      userEvent.click(screen.getByText("Next"))
      expect(store.getRawState().players[0].score).toBe(
        initialState().players[0].score + modifier
      )
      expect(store.getRawState().players[0].scoreModifier).toBe(0)
    })

    it("collapses score modifiers when the previous button is clicked", () => {
      const modifier = 42
      store.update(s => {
        s.players[0].scoreModifier = modifier
      })
      render(<Page />)
      userEvent.click(screen.getByText("Previous"))
      expect(store.getRawState().players[0].score).toBe(
        initialState().players[0].score + modifier
      )
      expect(store.getRawState().players[0].scoreModifier).toBe(0)
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
      userEvent.click(screen.getByText("Next"))
      expect(getActivePlayerName()).toBe("Beth")
    })

    it("moves to the first player when it needs to wrap", () => {
      render(<Page />)
      setActivePlayer("Diane")
      userEvent.click(screen.getByText("Next"))
      expect(getActivePlayerName()).toBe("Amanda")
    })

    it("moves to the previous player", () => {
      render(<Page />)
      setActivePlayer("Beth")
      userEvent.click(screen.getByText("Previous"))
      expect(getActivePlayerName()).toBe("Amanda")
    })

    it("previous player moves to last player when it needs to wrap", () => {
      render(<Page />)
      setActivePlayer("Amanda")
      userEvent.click(screen.getByText("Previous"))
      expect(getActivePlayerName()).toBe("Diane")
    })
  })

  describe("adding scores", () => {
    it("adds to active player's score", () => {
      render(<Page />)
      userEvent.click(screen.getByText("+1"))
      expect(screen.getByText("8 +1")).toBeInTheDocument()
      expect(store.getRawState().players[1].score).toBe(8)
      expect(store.getRawState().players[1].scoreModifier).toBe(1)
    })

    it("subtracts from the active player's score", () => {
      render(<Page />)
      userEvent.click(screen.getByText("-2"))
      expect(screen.getByText("8 -2")).toBeInTheDocument()
      expect(store.getRawState().players[1].score).toBe(8)
      expect(store.getRawState().players[1].scoreModifier).toBe(-2)
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
