import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { MediaQueries } from '../../Constants/MediaSettings';

export const Container = styled.div`
  width: 100%;
  height: 3.8rem;
  z-index: 99;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;

  background-color: ${(props) => props.theme.colors.secondary};
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.15);

  &:last-child {
    padding-right: 3rem;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: center;

    padding-left: 3rem;
    font-size: 1rem;

    h1 {
      font-weight: 400;
      color: ${(props) => props.theme.colors.white.light};
    }

    img {
      width: 3rem;
      margin-right: 10px;
    }
  }

  &:last-child{
    padding-right: 3rem ;
  }

  div {
    display: flex;
    align-items: center;

    a {
      display: flex;
      align-items: center;
      font-weight: 400;
      margin: 0 0.8rem;
      text-decoration: none;
      color: ${(props) => props.theme.colors.white.light};

      transition: ease 0.1s;

      &:hover {
        color: ${(props) => props.theme.colors.primary};
      }
    }

    .a-Button {
      margin: 0 0;
    }

    button {
      margin: 0px 5px;

      .iconTheme {
        color: ${(props) => props.theme.colors.white.light};
      }
    }

    .entrarButton {
      color: ${(props) => props.theme.colors.primary};
      border-radius: 0.2rem;
      border: 1px solid ${(props) => props.theme.colors.primary};
      margin-left: 2rem;

      transition: ease 0.2s;

      &:hover {
        border: 1px solid ${(props) => props.theme.colors.primaryLight};
        color: ${(props) => props.theme.colors.primaryLight};
      }
    }

    .cadastrarButton {
      color: #fff;
      border-radius: 0.2rem;
      background: ${(props) => props.theme.colors.primary};

      transition: ease 0.2s;

      &:hover {
        background: ${(props) => props.theme.colors.primaryLight};
      }
    }
  }

  .buttons {
    margin-right: 3rem;
    display: flex;
    justify-content: space-between;
    width: 200px;
  }

  .IconMenuMobile {
    display: none;
  }

  @media (max-width: 1100px) {
    header {
      padding-left: 1rem;

      input, svg {
        display: none;
      }
    }

    .buttons {
      display: none;
    }

    .IconMenuMobile {
      display: flex;
      align-items: center;
    }
  }

  .opcoes {
    gap: 60px;

    > a {
      display: flex;
      flex-direction: column;
      font-size: 1rem;
    }

    .mobileNotify {
      display: none;
    }

    @media ${MediaQueries.MEDIUM}, ${MediaQueries.SMALL}, ${MediaQueries.XSMALL}{
      gap: 0;

      .mobileNotify {
        display: block;
      }

      .mobileProject {
        display: none;
      }

      > a > span {
        display: none;
      }
    }
  }
`;

export const ContentMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;

  background-color: ${(props) => props.theme.colors.background};
  gap: 10px;

  &:first-child {
    margin-top: 80px;
  }

  > div {
    width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    margin-left: 15px;
    border-bottom: 1px solid ${props => props.theme.colors.tertiary};

    a {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      font-weight: 400;

      text-decoration: none;
      color: ${(props) => props.theme.colors.white.light};
      gap: 15px;

      &:hover {
        color: ${(props) => props.theme.colors.primary};
      }
    }

    .entrarButton {
      color: ${(props) => props.theme.colors.primary};
      border-radius: 0.2rem;
      width: 150px;
      border: 1px solid ${(props) => props.theme.colors.primary};

      transition: ease 0.2s;

      &:hover {
        border: 1px solid ${(props) => props.theme.colors.primaryLight};
        color: ${(props) => props.theme.colors.primaryLight};
      }
    }

    .cadastrarButton {
      color: #fff;
      width: 150px;
      border-radius: 0.2rem;
      background: ${(props) => props.theme.colors.primary};

      transition: ease 0.2s;

      &:hover {
        background: ${(props) => props.theme.colors.primaryLight};
      }
    }

    button {
      .iconTheme {
        color: ${(props) => props.theme.colors.white.light};
      }
    }
  }
`;

export const ContainerMenu = styled.div`
  width: 250px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  transition: ease all .3s;

  &:hover {
    opacity: 0.8;
  }
`;