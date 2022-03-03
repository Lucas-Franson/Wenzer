import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.white.light};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;

  padding: 0 10px;
`;
