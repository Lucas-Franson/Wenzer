import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const ContainerPostProject = styled.div`
  width: 345px;
  max-height: 345px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: ${(props) => props.theme.colors.secondary};
  border-bottom: 3px solid ${props => props.theme.colors.primary};
  border-radius: 8px;

  padding: 10px;
  margin: 12px;
  
  &:hover {
    box-shadow: 1px 3px 4px #8a00ff;
    cursor: pointer;
  }

  > span {
    text-align: center;
  }
  
  > img {
    width: 100%;
    max-height: 250px;
    object-fit: contain;
  }
  
  .containerContent {
    > h3 {
      width: 100%;
      font-weight: 500;
      font-size: 0.8rem;
      padding-bottom: 10px;
      
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    > .ContainerAction {
      display: flex;
      justify-content: space-around;
      border-top:1px solid  ${props => props.theme.colors.tertiary};

      > .action {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px 0;

        > .heart {
          color: red;
        }

        > .idea {
          color: yellow;
        }
      }
    }
  }

`;