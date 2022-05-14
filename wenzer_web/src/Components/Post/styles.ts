import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

export const Container = styled.div`
  width: 100%;
`;

export const ContainerPost = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  gap: 5px;

  background: ${(props) => props.theme.colors.secondary};
  border-radius: 8px;

  margin-top: 1.3rem;
  padding: 15px;
  box-sizing: border-box;

  > header {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 60px;
    gap: 15px;
    position: relative;
    
    > .userInfo {
      cursor: pointer;
      > span {
        font-size:  0.7rem;
      }
    }

    > .menuPost {
      .option {
        position: absolute;
        right: 0;
        top: 0;

        cursor: pointer;

        &:hover {
          background-color: ${props => props.theme.colors.tertiary};
          border-radius: 50%;
        }
      }
    }
   
  }

  > main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    text-align: left;

    .text {
      padding-bottom: 10px;
      height: auto;

      > p {
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 8px;
        word-break: break-word;
        text-align: justify;
      }

      > span {
        font-size: 0.8rem;
        font-weight: 400;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;
        text-align: justify;
      }
    }

    > .image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;

      > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  > footer {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid ${(props) => props.theme.colors.tertiary};

    > div {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 10px;
      border-radius: 8px;
      margin-top: 10px;;

      > span {
        font-size: 0.8rem;
      }

     > svg {
      &.active {
        color: yellow;
      }
     }

      &:hover {
          background-color: ${(props) => props.theme.colors.tertiary};
          opacity: 0.9;
          cursor: pointer;
      }  
    }
  }

  > .noMarginTop {
    margin-top: 0px;
  }
`;

export const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  transition: ease all .3s;

  &:hover {
    opacity: 0.8;
  }
`;