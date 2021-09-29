import styled from 'styled-components';

export const Container = styled.div`
  width: 350px;
  height: 450px;
  box-sizing: border-box;
  padding: 1.5rem 2.5rem;
  margin: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  color: ${(props) => props.theme.colors.white.light};
  background-color: ${(props) => props.theme.colors.secondary};
  border-bottom: 4px solid ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.28);

  strong {
    font-size: 1.3rem;
    font-weight: 500;
    text-align: center;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    div {
      margin: 10px 0;
    }

    p {
      font-size: 1rem;
      text-align: center;
      margin-top: 10px;
      font-weight: 300;
    }

    a {
      width: 100%;
      text-decoration: none;
      text-align: center;
      border-radius: 0.3rem;
      padding: 0.8rem 2.5rem;

      margin-top: 2.5rem;

      background-color: ${(props) => props.theme.colors.primary};
      color: #fff;

      &:hover {
        background-color: ${(props) => props.theme.colors.primaryLight};
      }
    }
  }

  span {
    font-size: 0.9rem;
    font-weight: 400;
    text-align: center;

    a {
      text-decoration: none;
      color: ${(props) => props.theme.colors.primary};
    }
  }

  @media (max-width: 1390px) {
    width: 340px;
    height: 420px;
    margin: 6px;

    a {
      display: flex;
      justify-content: center;
    }
  }

  @media (max-width: 600px) {
    width: 330px;
    margin: 20px;
  }

  @media (max-width: 365px) {
    width: 280px;
  }
`;