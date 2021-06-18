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
      font-size: 3rem;
      text-align: left;
      line-height: 3.5rem;
      margin-bottom: 3rem;
    }

  }
`;

