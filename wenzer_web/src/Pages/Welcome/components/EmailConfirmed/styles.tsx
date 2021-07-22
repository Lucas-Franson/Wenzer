import styled from 'styled-components';

export const Container = styled.div`
  width: 30rem;
  height: 20rem;
  box-sizing: border-box;
  padding: 1.5rem 2.5rem;
  margin-left: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  color: ${(props) => props.theme.colors.white.light};
  background-color: ${(props) => props.theme.colors.secondary};
  border-bottom: 4px solid ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.28);

  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      max-width: 5rem;
      margin-right: 1rem;
    }

    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      text-align: center;
      margin-bottom: 1rem;
    }

    h6 {
      font-size: 0.9rem;
      font-weight: 300;
      text-align: center;
    }
  }

  div {
    button {
      width: 100%;
      margin-top: 2rem;
      border-radius: 0.3rem;
      padding: 0.8rem 2.5rem;

      background-color: ${(props) => props.theme.colors.primary};
      color: #fff;

      &:hover {
        background-color: ${(props) => props.theme.colors.primaryLight};
      }
    }
  }

  ::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.secondary};
  }

  :-moz-placeholder {
    /* Firefox 18- */
    color: ${(props) => props.theme.colors.secondary};
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
    color: ${(props) => props.theme.colors.secondary};
  }

  :-ms-input-placeholder {
    color: ${(props) => props.theme.colors.secondary};
  }

  @media (max-width: 600px) {
    width: 22rem;
    height: 24rem;
    box-sizing: border-box;
    padding: 1.5rem 2.5rem;
    margin-left: 0;

    a {
      display: flex;
      justify-content: center;
    }
  }
`;