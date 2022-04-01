import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;

 
  > div {
    width: 100% !important;
    
    > div {
      padding: 0.8rem 1rem 0.8rem 1rem;
      margin-bottom: 1rem;
      font-weight: 400;
      font-size: 1rem;
      text-overflow: Ellipsis;
      
      color: ${(props) => props.theme.colors.white.light};
      border: none;
      border-radius: 0.5rem;
      background-color: ${(props) => props.theme.colors.background};
      
      &:hover {
        border: none;
        
      }
      
      &:active {
        border: 1px solid ${(props) => props.theme.colors.primary};
        border-radius: 0.5rem;
      }
      
      > div {
        > div {
          color: ${(props) => props.theme.colors.white.light};
          background-color: ${(props) => props.theme.colors.background};
          > div {
            color: ${(props) => props.theme.colors.white.light};
          }
        }
      }
    }
  }
`;

