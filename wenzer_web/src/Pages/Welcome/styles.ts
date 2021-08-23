import styled from 'styled-components';

export const Container = styled.div`
  /* display: flex;
  flex-direction: column; */
  height: 100vh;

  img {
    width: 38rem;
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
      align-items: flex-end;

      p {
        font-size: 2.2rem;
      }

      span {
        margin-top: 0.8rem;
        font-weight: 400;
      }
    }

    .alignLeft {
      align-items: flex-start;

      p {
        font-size: 2.2rem;
      }

      span {
        margin-top: 0.8rem;
        font-weight: 400;
      }
    }
  }

  @media (max-width: 600px) {
    .alignRight {
      align-items: center;
      margin-left: 0;

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

    .alignLeft {
      align-items: center;
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

  @media (max-width: 350px) {
    .alignRight {

      p {
        font-size: 1.5rem;
      }

      span {
        font-size: 0.8rem;
        font-weight: 400;
      }
    }

    .alignLeft {
      margin-right: 0;

      p {
        font-size: 1.5rem;
      }

      span {
        margin-top: 1.5rem;
        font-size: 0.8rem;
        font-weight: 400;
      }
    }

    div {
      img {
        margin: 2rem 0;
        width: 15rem;
      }
    }
  }
`;

export const ContainerLogin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100vh;

  border-bottom: 1px solid ${(potato) => potato.theme.colors.secondary};

  header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    margin-bottom: 30px;

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

    a {
      text-decoration: none;
      margin-top: 2rem;

      button {
        padding: 0.5rem 5rem;
      }
    }
  }

  main {
    display: flex;
  }

  @media (max-width: 1390px) {
    header {
      h1 {
        font-size: 2.8rem;
      }

      h2 {
        font-size: 1.1rem;
        max-width: 40rem;
      }
    }
  }

  @media (max-width: 1100px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 80px;

    header {
      align-items: center;
      justify-content: center;

      h1 {
        font-size: 2.8rem;
        text-align: center;
      }

      h2 {
        font-size: 1.3rem;
        font-weight: 300;
        max-width: 40rem;
        text-align: center;
      }

      a {
        margin: 2rem 0;
      }
    }
  }

  @media (max-width: 600px) {

    header {
      align-items: center;
      justify-content: center;

      margin-top: 4.5rem;

      h1 {
        font-size: 2.3rem;
        line-height: 3rem;
      }
    }
  }

  @media (max-width: 420px) {

    header {
      h1 {
        text-align: center;
      }
    }
  }

  @media (max-width: 380px) {
    header {
      h1 {
        font-size: 2rem;
      }
    }
  }

  @media (max-width: 375px) {
    margin-top: 150px;
    header {

      h2 {
        font-size: 1.1rem;
        max-width: 40rem;
        text-align: center;
      }
    }
  }

  @media (max-width: 360px) {
    header {
      h1 {
        font-size: 1.8rem;
        line-height: 2.5rem;
      }

      h2 {
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: 350px) {
    margin-top: 150px;
  }
`;

export const ContainerAbout = styled.div`
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

    font-size: 1.3rem;
    text-align: center;

    .AboutIcon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px 0 0 8px;

      width: 12%;
      height: 100%;
      background-color: ${(props) => props.theme.colors.succes};
    }

    .AboutContent {
      p {
        padding: 0 5px;
        font-size: 1.5rem;
        text-align: center;
      }
    }
  }

  @media (max-width: 1100px) {
    header {
      flex-direction: column-reverse;
      justify-content: center;
    }

    main {
      font-size: 1.2rem;

      .AboutIcon {
        width: 20%;
      }
    }
  }

  @media (max-width: 600px) {
    @media (max-height: 538px) {
      height: 1600px;
    }

    height: 800px;

    .alignRight {
      > p {
        margin-top: 9rem;
      }
    }

    main {
      .AboutIcon {
        width: 25%;
      }

      .AboutContent {
        padding: 10px;
        p {
          font-size: 1rem;
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
      flex-direction: column;
      justify-content: center;
    }

    footer {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 375px) {
    margin-top: 120px;

    footer {
      font-size: 1.1rem;
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
    justify-content: center;
    margin: 100px 0;
    text-align: center;

    main {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 375px) {
    header {
      p {
        font-size: 1.3rem;
      }
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

  padding: 2rem 0;
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
        font-size: 15px;
        color: ${(props) => props.theme.colors.white.light};

        &:hover {
          color: ${(props) => props.theme.colors.primary};
        }
      }
    }
  }

  footer {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-weight: 300;
    font-size: 0.9rem;

    a {
      margin: 0.6rem 0;
      text-decoration: none;
      font-weight: 300;
      color: ${(props) => props.theme.colors.white.light};

      &:hover {
        color: ${(props) => props.theme.colors.primary};
      }
    }
  }

  @media (max-width: 600px) {
    text-align: center;
    height: 60vh;

    div {
      margin-top: 15px;
      flex-direction: column;

      section {
        font-size: 1rem;

        a {
          padding: 5px;
        }

        .social-media {
          flex-direction: row;
          justify-content: center;
        }
      }

    }

    footer {
      font-size: 1rem;
      padding: 0px 10px;
      max-width: 360px;
    }
  }

  @media (max-width: 375px) {
    height: 70vh;
    padding: 2.5rem 0;

    div {
      section {
        strong {
          font-size: 1.1rem;
        }

        a {
          font-size: 0.8rem;
        }
      }
    }
  }

  @media (max-width: 360px) {
    height: 70vh;
    padding: 4rem 0;
  }
`;


