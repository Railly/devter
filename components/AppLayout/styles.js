import css from 'styled-jsx/css'
import { fonts, colors, breakpoints } from '../../styles/theme'
import { addOpacityColor } from '../../styles/utils'

const backgroundColor = addOpacityColor(colors.primary, 0.3)
const shadowColor = addOpacityColor(colors.secondary, 0.2)

export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${backgroundColor} 1px, #fafafa 1px),
      radial-gradient(${backgroundColor} 1px, #fafafa 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    font-family: ${fonts.base};
  }

  * {
    box-sizing: border-box;
  }
`

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }

  main {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 25px ${shadowColor};
    height: 100%;
    width: 100%;
  }

  @media (min-width: ${breakpoints.mobile}) {
    main {
      height: 90vh;
      width: ${breakpoints.mobile};
    }
  }
`
