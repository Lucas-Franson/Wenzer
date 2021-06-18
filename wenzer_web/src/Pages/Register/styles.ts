import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
  justify-content: space-around;
  align-items: center;

  margin-top: 4.5rem;
  height: 90vh;

  header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    button {
      color: #FFF;
      background-color: ${props => props.theme.colors.primary};
      border-radius: 0.3rem;
      padding: 0.5rem 2.5rem;

       &:hover {
        background-color: ${(props) => props.theme.colors.primaryLight};
      }
    }

    h1 {
      width: 35rem;
      font-size: 2.5rem;
      text-align: left;
      line-height: 2.8rem;
      margin-bottom: 3rem;
    }

    h2 {
      font-size: 1.1rem;
      font-weight: 300;
      max-width: 40rem;
      text-align: left;
      margin-bottom: 3rem;
    }

    a {
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: 1rem;

      text-decoration: none;
      color: ${props => props.theme.colors.primary};
      
      svg {
        margin-right: 1rem;
      }

      &:hover {
        color: ${props => props.theme.colors.primaryLight}
      }
    }
  }
`;
