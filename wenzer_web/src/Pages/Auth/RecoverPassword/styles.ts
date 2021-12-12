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

    h1 {
      width: 40rem;
      font-size: 2.6rem;
      text-align: left;
      line-height: 3.5rem;
      margin-bottom: 3rem;
    }

    a {
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: 1rem;

      text-decoration: none;
      color: ${(props) => props.theme.colors.primary};

      svg {
        margin-right: 1rem;
      }

      &:hover {
        color: ${(props) => props.theme.colors.primaryLight};
      }
    }
  }
`;

