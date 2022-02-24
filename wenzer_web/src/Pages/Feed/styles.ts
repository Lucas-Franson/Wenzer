import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

export const Container = styled.div`
  width: min(92vw, 800px);
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.white.light};
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const ContainerNewPost = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  gap: 15px;

  background: ${(props) => props.theme.colors.secondary};
  border-radius: 8px;

  margin-top: 5rem;
  padding: 15px;
  box-sizing: border-box;
`;

export const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  transition: ease all .3s;

  &:hover {
    opacity: 0.8;
  }
`;