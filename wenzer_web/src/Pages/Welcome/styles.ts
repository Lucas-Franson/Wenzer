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
      font-size: 3rem;
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
      font-size: 3rem;
      text-align: left;
    }

    span {
      margin-top: 1rem;
      font-size: 1rem;
      text-align: left;
    }
  }

  @media (max-width: 1390px) {
    img {
      width: 33rem;
      margin-top: 30px;
    }
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
        margin-top: 0.8rem;
        font-size: 1rem;
        text-align: center;
      }
    }
  }

  @media (max-width: 600px) {
    .alignRight {
      margin-left: 0;
      p {
        font-size: 2rem;
        text-align: center;
      }

      span {
        margin-top: 1rem;
        font-size: 0.9rem;
        font-weight: 400;
        text-align: center;
      }
    }

    .alignLeft {
      margin-right: 0;
      p {
        font-size: 2rem;
        text-align: center;
      }

      span {
        margin-top: 1.5rem;
        font-size: 0.9rem;
        font-weight: 400;
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

  height: 100vh;

  border-bottom: 1px solid ${potato => potato.theme.colors.secondary};

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
      font-size: 3.5rem;
      text-align: left;
      line-height: 3.8rem;
      max-width: 35rem;
      margin-bottom: 15px;
    }

    h2 {
      font-size: 1.2rem;
      font-weight: 300;
      max-width: 35rem;
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

  @media (max-width: 1390px) {
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

  @media (max-width: 1100px) {
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
        width: 350px;
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

    margin-top: 0rem;

    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      margin-top: 4.5rem;

      h1 {
        font-size: 2.3rem;
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
        max-width: 200px;
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

  @media (max-width: 420px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      margin-top: 9.5rem;

      h1 {
        font-size: 2.3rem;
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
        max-width: 200px;
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

  @media (max-width: 380px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h1 {
        font-size: 2.3rem;
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
        max-width: 320px;
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

  @media (max-width: 375px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h1 {
        font-size: 2rem;
        text-align: center;
        line-height: 3rem;
      }

      h2 {
        font-size: 1.1rem;
        font-weight: 300;
        max-width: 40rem;
        text-align: center;
      }

      img {
        margin-top: 3rem;
        max-width: 320px;
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
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
  border-bottom: 1px solid ${(potato) => potato.theme.colors.secondary};
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 150px;
    background-color: ${(props) => props.theme.colors.secondary};
    border-radius: 8px;

    .AboutIcon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px 0 0 8px;

      width: 12%;
      height: 100%;
      background-color: ${(props) => props.theme.colors.succes};
    }
  }

  @media (max-width: 1100px) {
    header {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      justify-content: center;
    }

    main {
      .AboutIcon {
        width: 20%;
      }
    }
  }

  @media (max-width: 600px) {
    header {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      justify-content: center;
    }

    main {
      height: 100px;
      .AboutIcon {
        width: 25%;
      }

      .AboutContent {
        padding: 10px;
        p {
          font-size: 1rem;
          text-align: center;
        }
      }

      .AboutNone {
        display: none;
      }
    }
  }
`;

export const ContainerNetworking = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100vh;
  border-bottom: 1px solid ${(potato) => potato.theme.colors.secondary};

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 2rem;
    border-left: 5px solid ${(props) => props.theme.colors.primary};
    height: 100px;

    p {
      span {
        color: ${(props) => props.theme.colors.primary};
      }
    }
  }

  @media (max-width: 1100px) {
    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    footer { 
      font-size: 1.5rem;
    }
  }
`;

export const ContainerProject = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: auto;
  margin: 220px 0;
  gap: 50px;

  header {
    p {
      font-size: 2.5rem;
    }
  }

  main {
    display: flex;
  }

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
    align-items: center;
    justify-content: center;
    margin: 100px 0;
    text-align: center;

    main {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
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

      a {
        color: ${(props) => props.theme.colors.white.light};
      }

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

  @media (max-width: 600px) {
    text-align: center;
    left: 0;
    height: 60vh;

    div {
      margin-top: 15px;
      display: flex;
      flex-direction: column;
      width: 100%;

      section {
        display: flex;
        flex-direction: column;

        font-weight: 400;
        font-size: 1rem;

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
        align-items: center;
        font-weight: 500;
        font-size: 1rem;
        margin-top: 2rem;

        
        a {
          &:first-child {
            margin-left: 15px;
          }
          margin-right: 5px;
        }
        

        svg {
          margin: 0 0.2rem;
          cursor: pointer;
        }
      }
    }

    footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      font-weight: 300;
      font-size: 1rem;
      padding: 0px 10px;
      max-width: 360px;

      a {
        margin: 0.6rem 0;
        text-decoration: none;
        font-weight: 300;
        color: ${(props) => props.theme.colors.white.light};
      }
    }
  }
`;


