import styled from "styled-components";

export const Content = styled.main`
  width: 1000px;
  height: 500px;
  overflow-y: scroll;
  min-width: max-content;
  grid-area: content;

  @media(max-width: 1200px) {
    width: 800px;
  }

  @media(max-width: 950px) {
    width: 500px;
  }

  @media(max-width: 500px) {
    width: max-content;
  }
`