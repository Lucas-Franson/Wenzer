import styled from 'styled-components';

export const Container = styled.div`
  width: min(92vw, 1200px);
  display: flex;
  color: ${(props) => props.theme.colors.white.light};
  justify-content: center;
  align-items: flex-start;
  margin: auto;
  margin-top: 5rem;

  gap: 15px;

  font-size: 1rem;
  font-weight: 400;
  
  @media (max-width: 1490px){
    width: min(92vw, 650px);
    flex-direction: column;
  }
`;

export const ContainerComent = styled.div`
  width: 100%;
  height: 760px;
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
`;

export const Coment = styled.div`
  width: 100%;
  height: auto;
  padding: 0.8rem 3rem 0.8rem 1rem;
  margin-top: 0.5rem;
  font-weight: 400;
  font-size: 1rem;
  text-overflow: Ellipsis;

  color: ${(props) => props.theme.colors.white.light};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.background};
`;

export const MainComent = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  /* border-left: 1px solid ${(props) => props.theme.colors.tertiary}; */

  .coment {
    display: flex;
    gap: 15px;

    .coment-user {
      display: flex;
      flex-direction: column;
      width: 100%;

      .coment-like {
        padding: 10px 0;
        display: flex;
        gap: 10px;
        font-size: 0.8rem;
        
        span {
          cursor: pointer;

          &:hover {
            opacity: 0.7;
            cursor: pointer;
          }
        }

        > div {
          display: flex;
          align-items: center;
          gap: 5px;

          > svg {
            &.active {
              color: yellow;
            }
          }
        }
      }
    }
  }

`;

export const SubComent = styled.div`
  padding-left:  3.5em;
  margin-top: 1rem;

  @media (max-width: 900px){
    padding-left:  1rem;
  }
`;

export const MyComent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  padding: 10px 0;

  border-top: 1px solid ${props => props.theme.colors.tertiary};

  input {
    margin-bottom: 0 !important;
  }
`;

