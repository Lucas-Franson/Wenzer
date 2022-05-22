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
  align-items: center;
  flex-wrap: wrap;  
`;