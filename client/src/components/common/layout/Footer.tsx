import React from 'react'

import styled from "styled-components"
import { theme, flex, MainContainer } from 'assets/styles/constants'

export const Footer: React.FC = () => {

  const date = new Date()

  return (
    <FooterContainer>

        <MainContainer>
            <FooterContent>
              <p>Github: <a href="https://github.com/GregDemidenkov">https://github.com/GregDemidenkov</a></p>
              <p>© {date.getFullYear()}, Демиденков Григорий </p>
            </FooterContent>
        </MainContainer>

    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  position: absolute;
  width: 100%;
  padding: 15px 0;
  text-align: center;
  border-top: 1px solid ${theme.gray};
`

const FooterContent = styled.div`
  ${flex}
  flex-direction: column;

  p {
    font-size: 14px;
    color: ${theme.blue};

    :first-child {
      margin-bottom: 10px;

      a {
        color: ${theme.gray};
        text-decoration: underline;
        text-decoration-thickness: 0.2px;
      }
    }
  }

`

