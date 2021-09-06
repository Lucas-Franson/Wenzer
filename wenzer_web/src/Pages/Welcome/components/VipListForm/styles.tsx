import styled from 'styled-components';

export const Container = styled.div`
  width: 26rem;
  height: 25rem;
  box-sizing: border-box;
  padding: 1.5rem 2.5rem;
  
  z-index: 99;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  color: ${(props) => props.theme.colors.white.light};
  background-color: ${(props) => props.theme.colors.secondary};
  border-bottom: 4px solid ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.28);

  strong {
    font-weight: 500;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    button {
      width: 100%;
      border-radius: 0.3rem;
      padding: 0.8rem 2.5rem;

      background-color: ${(props) => props.theme.colors.primary};
      color: #fff;

      &:hover {
        background-color: ${(props) => props.theme.colors.primaryLight};
      }
    }

    a {
      width: 100%;
      height: 2rem;

      display: flex;
      justify-content: flex-end;
      align-items: center;

      margin-bottom: 1rem;
      color: ${(props) => props.theme.colors.white.light};

      font-weight: 300;
      font-size: 0.9rem;
      text-decoration: none;

      &:hover {
        color: ${(props) => props.theme.colors.primary};
      }
    }
  }

  span {
    font-size: 0.9rem;
    font-weight: 400;
    text-align: center;
    max-width: 18rem;

    a {
      text-decoration: none;
      color: ${(props) => props.theme.colors.primary};

      &:hover {
        color: ${(props) => props.theme.colors.primaryLight};
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

  @media (max-width: 1390px) {
    width: 23rem;
    height: 25rem;
    box-sizing: border-box;
    padding: 1.5rem 1.8rem;

    strong {
      font-weight: 400;
      font-size: 17px;
    }

    a {
      display: flex;
      justify-content: center;
    }
  }

  @media (max-width: 600px) {
    width: 22rem;
    height: 24rem;
    box-sizing: border-box;
    padding: 1.5rem 2.5rem;

    a {
      display: flex;
      justify-content: center;
    }
  }
`;