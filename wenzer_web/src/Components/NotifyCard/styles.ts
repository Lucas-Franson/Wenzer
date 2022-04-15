import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  border-radius: 8px;
  gap: 15px;
  background-color: ${props => props.theme.colors.background};
  margin: 5px 0;

  > .avatar-notify {
    width: 60px;
    height: 60px;
  }

  > .content {
    display: flex;
    flex-direction: column;

    > p {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    > span {
      font-size: 0.8rem;
    }
  }

  > .actions {
    display: flex;
    gap: 10px;

    > svg {
      cursor: pointer;
    }
  }
`;
