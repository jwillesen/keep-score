/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro"

const srCss = css`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;

  &:focus {
    position: static;
    width: auto;
    height: auto;
  }
`

interface Props extends React.ComponentProps<"span"> {
  children: React.ReactNode
}

export default function SrOnly({ children }: Props) {
  return <span css={srCss}>{children}</span>
}
