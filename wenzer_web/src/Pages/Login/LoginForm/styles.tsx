import styled from 'styled-components';

export const Container = styled.div`
  width: 26rem;
  height: 32rem;
  box-sizing: border-box;
  padding: 1.5rem 2.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  color: ${(props) => props.theme.colors.white.light};
  background-color: ${(props) => props.theme.colors.secondary};
  border-bottom: 4px solid ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.28);

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

      transition: ease all 0.2s;

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

      transition: ease all 0.2s;

      &:hover {
        color: ${(props) => props.theme.colors.primary};
      }
    }
  }

  span {
    font-size: 0.9rem;
    font-weight: 400;

    transition: ease all 0.2s;

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
`;

