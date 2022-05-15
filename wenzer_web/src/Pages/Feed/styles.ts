import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

export const Container = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.white.light};
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-bottom: 20px;

  font-size: 1rem;
  font-weight: 400;
  
  @media (max-width: 1490px){
    width: min(92vw, 450px);
  }
`;

export const ContainerNewPost = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 5px;

  background: ${(props) => props.theme.colors.secondary};
  border-radius: 8px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};

  margin-top: 5rem;
  padding: 15px;
  box-sizing: border-box;

  > header {
    display: flex;
    width: 100%;
    gap: 15px;
  }

  > main {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    > div {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 10px;
        margin-bottom: 5px;
        border-radius: 8px;
        gap: 10px;
        cursor: pointer;

        &:hover {
          background-color: ${(props) => props.theme.colors.tertiary};
          opacity: 0.9;
        }  
    }
  }
`;

export const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  transition: ease all .3s;

  &:hover {
    opacity: 0.8;
  }
`;

export const InputNewPost = styled.div`
  width: 100%;
  padding: 0.8rem 3rem 0.8rem 1rem;
  margin-bottom: 1rem;
  font-weight: 400;
  text-overflow: Ellipsis;

  color: ${(props) => props.theme.colors.white.light};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.background};

  cursor: pointer;
`;

export const ContainerAds = styled.div`
  width: 350px;
  height: 600px;
  position: fixed;
  top: 10%;
  right: 5%;

  display: flex;
  justify-content: center;

  img {
    width: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 1490px){
    width: 250px;
    height: 600px;
  }

  @media (max-width: 1180px){
    display: none;
  }
`;

export const ContainerRecomendado = styled.div`
  width: 350px;
  height: 700px;
  position: fixed;
  overflow-y:  scroll;
  top: 10%;
  left: 5%;

  padding: 10px 5px 10px 5px;

  background: ${(props) => props.theme.colors.secondary};
  border-radius: 8px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};

  p {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }

  @media (max-width: 1490px){
    width: 250px;
    height: 600px;
  }

  @media (max-width: 1180px){
    display: none;
  }
`;
