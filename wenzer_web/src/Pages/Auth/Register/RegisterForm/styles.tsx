import styled from 'styled-components';
import { MediaQueries } from '../../../../Constants/MediaSettings';

export const Container = styled.div`
  width: 26rem;
  height: 40rem;
  box-sizing: border-box;
  padding: 1.5rem 2.5rem;

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
    font-weight: 600;
    font-size: 1.5rem;
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

    >.checkbox {
      width: 100%;
      display: flex;
      gap: 15px;
      margin-bottom: 10px;
      margin-left: 5px;
      
      > input::before {
        color: ${(props) => props.theme.colors.primary};
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

      &:hover {
        color: ${(props) => props.theme.colors.primaryLight};
      }
    }
  }

  @media ${MediaQueries.MEDIUM}, ${MediaQueries.SMALL}, ${MediaQueries.XSMALL}{
    width: 22rem;

    padding: 1rem 1.2rem;

    strong {
      font-weight: 600;
      font-size: 1.2rem;
      margin-bottom: 10px;
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


