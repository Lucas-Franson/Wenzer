import styled from 'styled-components';
import { MediaQueries } from '../../Constants/MediaSettings';

export const Container = styled.div`
  width: min(92vw, 1350px);
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.white.light};
  margin: auto;

  font-size: 1rem;
  font-weight: 400;
  margin-top: 5rem;

  .ButtonSearch {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  @media (max-width: 1490px){
    width: min(92vw, 1200px);
    font-size: 1rem;
  }

  @media ${MediaQueries.MEDIUM}, ${MediaQueries.SMALL}, ${MediaQueries.XSMALL} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media ${MediaQueries.LAYMODE} {
    height: 50rem;
  }
`;

export const ContainerProjects = styled.main`
  width: 100%;
  border-radius: 8px;
  
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;  
`;

export const ContainerSearch = styled.div`
  width: 250px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.secondary};
  border-bottom:1px solid ${props => props.theme.colors.succes};
  box-sizing: border-box;
  padding: 10px;
  margin-top: 12px;

  > h4 {
    font-weight: 400;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
    
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      input {
        border: none;
        transform: scale(1.5);

        @media ${MediaQueries.MEDIUM}, ${MediaQueries.SMALL}, ${MediaQueries.XSMALL} {
          transform: scale(1);
        }
      }

      input:checked {
        background-color: #ff0000;
      }
    }

    @media ${MediaQueries.MEDIUM}, ${MediaQueries.SMALL}, ${MediaQueries.XSMALL} {
      align-items: flex-start;
    }
  }

`;