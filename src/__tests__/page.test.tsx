import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { store } from "../store"
import Page from "../components/page"
import { restoreState, initialState } from "../test-utils"

describe("Keep Score", () => {
  store.replace(initialState())
  beforeEach(restoreState())

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

  describe("action menu", () => {
    it("resets the scores", () => {
      store.update(s => {
        s.players.forEach((p, i) => (p.scoreModifier = i))
      })
      render(<Page />)
      userEvent.click(screen.getByText("Action Menu"))
      userEvent.click(screen.getByText("Reset Scores"))
      expect(store.getRawState().players.every(p => p.score === 0)).toBeTruthy()
      expect(
        store.getRawState().players.every(p => p.scoreModifier === 0)
      ).toBeTruthy()
    })
  })
})
