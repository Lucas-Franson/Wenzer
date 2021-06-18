import styled from 'styled-components';

export const Container = styled.div`
  img {
    width: 40rem;
  }

  .alignRight {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 2rem;

    p {
      font-size: 2.5rem;
      text-align: right;
    }

    span {
      margin-top: 1rem;
      font-size: 1rem;
      text-align: right;
    }
  }

  .alignLeft {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 2rem;

    p {
      font-size: 2.5rem;
      text-align: left;
    }

    span {
      margin-top: 1rem;
      font-size: 1rem;
      text-align: left;
    }
  }

  @media (max-width: 1100px) {
    .alignRight {
      p {
        font-size: 2.2rem;
        text-align: center;
      }

      span {
        margin-top: 0.8rem;
        font-size: 1rem;
        text-align: center;
      }
    }

    .alignLeft {
      p {
        font-size: 2.2rem;
        text-align: center;
      }

      span {
        margin-top: 1rem;
        font-size: 0.8rem;
        text-align: center;
      }
    }
  }

  @media (max-width: 600px) {
    .alignRight {
      p {
        font-size: 1.7rem;
        text-align: center;
      }

      span {
        margin-top: 1rem;
        font-size: 0.7rem;
        text-align: center;
      }
    }

    .alignLeft {
      p {
        font-size: 1.7rem;
        text-align: center;
      }

      span {
        margin-top: 1rem;
        font-size: 0.7rem;
        text-align: center;
      }
    }

    div {
      img {
        margin: 2rem 0;
        width: 20rem;
      }
    }
  }
`;

export const ContainerLogin = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 4.5rem;
  height: 90vh;

  header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    button {
      color: #fff;
      background-color: ${(props) => props.theme.colors.primary};
      border-radius: 0.3rem;
      padding: 0.5rem 2.5rem;

      &:hover {
        background-color: ${(props) => props.theme.colors.primaryLight};
      }
    }

    h1 {
      font-size: 3rem;
      text-align: left;
      line-height: 3.8rem;
    }

    h2 {
      font-size: 1.3rem;
      font-weight: 300;
      max-width: 40rem;
      text-align: left;
    }

    img {
      margin-top: 3rem;
      width: 30rem;
    }

    a {
      text-decoration: none;
      margin-top: 2rem;

      button {
        padding: 0.5rem 5rem;
      }
    }
  }

  @media (max-width: 1100px) {
    font-size: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 5rem;
    height: 100vh;

    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h1 {
        font-size: 2.8rem;
        text-align: center;
        line-height: 3.8rem;
      }

      h2 {
        font-size: 1.3rem;
        font-weight: 300;
        max-width: 40rem;
        text-align: center;
      }

      img {
        margin-top: 3rem;
        width: 20rem;
      }

      a {
        text-decoration: none;
        margin: 2rem 0;

        button {
          padding: 0.5rem 5rem;
        }
      }
    }
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 11rem;
    height: 100vh;

    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h1 {
        font-size: 2.5rem;
        text-align: center;
        line-height: 3rem;
      }

      h2 {
        font-size: 1.3rem;
        font-weight: 300;
        max-width: 40rem;
        text-align: center;
      }

      img {
        margin-top: 3rem;
        width: 20rem;
      }

      a {
        text-decoration: none;
        margin: 2rem 0;

        button {
          padding: 0.5rem 5rem;
        }
      }
    }
  }
`;

export const ContainerAbout = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;

  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;

  }

`;

export const ContainerUniversity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;

  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ContainerBusiness = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;

  button {
    color: #fff;
    background-color: ${(props) => props.theme.colors.succes};
    border-radius: 0.3rem;
    padding: 0.5rem 2.5rem;
    box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.15);

    margin-top: 5rem;

    &:hover {
      background-color: opacity(${(props) => props.theme.colors.primaryLight});
    }
  }

  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
  }
`;

export const ContainerFooter = styled.footer`
  position: absolute;
  width: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: ${(props) => props.theme.colors.black};

  padding-bottom: 1rem;
  height: 30vh;

  div {
    display: flex;
    justify-content: space-around;
    width: 100%;

    section {
      display: flex;
      flex-direction: column;

      font-weight: 400;

      a {
        margin: 0.5rem 0;
        text-decoration: none;
        font-weight: 300;
        color: ${(props) => props.theme.colors.white.light};

        &:hover {
          color: ${(props) => props.theme.colors.primaryLight};
        }
      }
    }

    p {
      display: flex;
      justify-content: center;

      svg {
        margin: 0 0.2rem;
        cursor: pointer;

        &:hover {
          color: ${(props) => props.theme.colors.primaryLight};
        }
      }
    }
  }

  footer {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-weight: 300;
    font-size: 1rem;

    a {
      margin: 0.6rem 0;
      text-decoration: none;
      font-weight: 300;
      color: ${(props) => props.theme.colors.white.light};

      &:hover {
        color: ${(props) => props.theme.colors.primaryLight};
      }
    }
  }
`;


