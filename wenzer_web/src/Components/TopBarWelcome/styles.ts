import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 4.5rem;
  z-index: 9999;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;

  top: 0;

  background-color: ${(props) => props.theme.colors.secondary};
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.15);

  header {
    display: flex;
    align-items: center;

    padding-left: 5rem;

    h1 {
      font-weight: 400;
      font-size: 1.5rem;
      color: ${(props) => props.theme.colors.white.light};
    }

    img {
      width: 3rem;
      margin-right: 10px;
    }
  }

  div {
    display: flex;
    align-items: center;
    padding-right: 5rem;

    a {
      font-weight: 400;
      margin: 0 0.8rem;
      text-decoration: none;
      color: ${(props) => props.theme.colors.white.light};

      transition: ease 0.3s;

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

  .IconMenuMobile {
    display: none;
  }

  @media (max-width: 1100px) {
    header {
      display: flex;
      align-items: center;

      padding-left: 1rem;
    }

    div {
      display: none;
    }

    .IconMenuMobile {
      display: flex;
      align-items: center;
      padding-right: 0.5rem;
    }
  }

  @media (max-width: 600px) {
    header {
      display: flex;
      align-items: center;

      padding-left: 1rem;
    }

    div {
      display: none;
    }

    .IconMenuMobile {
      display: flex;
      align-items: center;
      padding-right: 0.5rem;
    }
  }
`;
