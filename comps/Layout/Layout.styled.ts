import styled from 'styled-components';

export const LayoutGrid = styled.section`
  display: grid;
  grid-template-areas: 
  "header header"
  "nav content"
  "footer footer";
  grid-template-columns: 100px max-content;

  @media(max-width: 500px) {
    grid-template-areas: 
    "header"
    "nav"
    "content"
    "footer";
    grid-template-columns: 300px;
  }
`

export const LayoutWrapper = styled.section`
  height: 100%;
  border-radius: 3px;
  box-shadow: 1px 1px 5px #cbcbcb;
  padding: 20px;
  width: max-content;
  min-width: max-content;
  position: relative;
  margin-top: 30px;
`
