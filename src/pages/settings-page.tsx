/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro"

const settingsPageStyles = css`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
`

export default function SettingsPage() {
  return (
    <div css={settingsPageStyles} data-testid="settings-page">
      There are no settings right now. Want one? Email
      <a
        href="mailto:jon.willesen@gmail.com?subject=Keep%20Score%20Feature%20Request"
        target="_blank"
        rel="noreferrer"
      >
        jon.willesen@gmail.com
      </a>
    </div>
  )
}
