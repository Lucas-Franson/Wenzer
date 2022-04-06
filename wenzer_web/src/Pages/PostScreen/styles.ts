import styled from 'styled-components';

export const Container = styled.div`
  width: min(92vw, 1300px);
  display: flex;
  color: ${(props) => props.theme.colors.white.light};
  justify-content: center;
  align-items: center;
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
  height: 560px;
  display: flex;
  overflow-y: scroll;
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

export const MainComent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* border-left: 1px solid ${(props) => props.theme.colors.tertiary}; */

  .coment {
    display: flex;
    gap: 15px;

    .coment-user {
      display: flex;
      flex-direction: column;
      width: 100%;

      > span {
        margin-top: 10px;
        font-size: 0.9rem;

        &:hover {
          opacity: 0.7;
          cursor: pointer;
        }
      }
    }
  }

`;

export const SubComent = styled.div`
  padding-left:  5rem;
  margin-top: 1rem;
`;

