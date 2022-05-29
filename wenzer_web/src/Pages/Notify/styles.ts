import styled from 'styled-components';
import { MediaQueries } from '../../Constants/MediaSettings';

export const ContainerNotify = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

  background: ${(props) => props.theme.colors.secondary};
  border-radius: 8px;

  margin-top: 5rem;
  padding: 15px;
  box-sizing: border-box;

  > header {
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.colors.tertiary};

    > h2 {
      margin: 10px 0;
      font-weight: 400;
    }

    @media ${MediaQueries.MEDIUM}, ${MediaQueries.SMALL}, ${MediaQueries.SMALL} {
      > h2 {
        font-size: 1.2rem;
      }
    }
  }

  > main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div {
      width: 100%;
    }
  }
`;

export const CardNotify = styled.div`

`;
