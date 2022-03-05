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

export const ContainerProfile = styled.header`
  width: 320px;
  border-radius: 8px;

  div {
    margin-bottom: 15px;
  }

  @media (max-width: 1490px){
    width: 300px;
  }
`;

export const CardProfile = styled.div`
  width: 100%;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  background: ${(props) => props.theme.colors.secondary};
  border-bottom: 3px solid ${props => props.theme.colors.succes};
  border-radius: 8px;

  .imageProfile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

    .avatarProfile{
      width: 150px;
      height: 150px;
    }

    > span {
      color: ${props => props.theme.colors.grey};
      font-size: 0.8rem;
    }
  }

  .counterProject{
    display: flex;
    justify-content: space-around;;
    align-items: center;

    border-top: 1px solid ${props => props.theme.colors.tertiary};

    .counter {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      margin-top: 10px;
    }
  }
`;

export const CardInfo = styled.div`
  width: 100%;
  height: 100px;
  background: ${(props) => props.theme.colors.secondary};
  border-bottom: 3px solid ${props => props.theme.colors.succes};
  border-radius: 8px;

  padding: 10px;
  
  > h3 {
    font-size: 1.1rem;
    font-weight: 400;
    padding-bottom: 10px;
    border-bottom: 1px solid ${props => props.theme.colors.tertiary}
  }

  > span {
    font-size: 0.9rem;
    font-weight: 400;
    color: ${props => props.theme.colors.grey}
  }

  &.mt-10 {
    margin-top: 10px;
  }

  @media (max-width: 1490px){
    > h3 {
      font-size: 0.9rem;
    }

    > span {
      font-size: 0.8rem;
    }
  }
`;

export const ContainerProjects = styled.main`
  width: min(92vw, 900px);
  border-radius: 8px;
  height: 900px;

  margin-bottom: 15px;

  .wraper {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    overflow-y: scroll;
  }

  @media (max-width: 1490px){
    width:  min(92vw, 750px);
    margin-left: 20px;
  }
`;

export const CardMyProject = styled.div`
  width: 30%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: ${(props) => props.theme.colors.secondary};
  border-bottom: 3px solid ${props => props.theme.colors.primary};
  border-radius: 8px;

  padding: 10px;
  margin: 0px 15px 15px 0px;
  
  
  > img {
    width: 100%;
    object-fit: contain;
  }
  
  > h3 {
    width: 100%;
    font-weight: 500;
    font-size: 0.8rem;
    padding-bottom: 10px;
    
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

`;
