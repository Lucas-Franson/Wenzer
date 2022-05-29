import styled from 'styled-components';
import { MediaQueries } from '../../Constants/MediaSettings';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  gap: 15px;
  background-color: ${props => props.theme.colors.background};
  margin: 5px 0;

  > div {
    display: flex;
    align-items: center;
    gap: 15px;

    > header {
      width: 60px;
      height: 60px;
      border-radius: 50%;

      display: flex;
      align-items: center;
      justify-content: center;

      background-color: ${props => props.theme.colors.tertiary};
    }

    > .content {
      display: flex;
      flex-direction: column;

      > p {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 11px;
      }

      > span {
        font-size: 0.8rem;
      }
    }

    @media ${MediaQueries.MEDIUM}, ${MediaQueries.SMALL}, ${MediaQueries.XSMALL} {
        > header {
          width: 45px;
          height: 45px;
          padding: 10px;
        }
      }
  }

  > .actions {
    display: flex;
    gap: 10px;

    > svg {
      cursor: pointer;

      &.accept {
        &:hover {
          border-radius: 50%;
          border: 1px solid ${props => props.theme.colors.succes};
        }
      }

      &.deny {
        &:hover {
          border-radius: 50%;
          border: 1px solid ${props => props.theme.colors.warning};
        }
      }
    }

  }
`;
