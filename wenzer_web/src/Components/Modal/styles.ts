import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const ContainerModal = styled.div`
    width: min(90vw, 600px);
    height: auto;

    border-radius: 8px;
    background: ${props => props.theme.colors.secondary};
    box-sizing: border-box;
    margin: 0 auto;
    margin-top: 8rem;

    span {
        font-weight: 400;
        font-size: 1.1rem;
    }

    > header {
        padding: 10px 20px;
        border-bottom: 1px solid  ${props => props.theme.colors.tertiary};
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 10px;

        > h2 {
            font-weight: 400;
            font-size: 1.3rem;
        }

        > svg {
            cursor: pointer;
        }
    }

    > main {
        padding: 10px 20px;

        .profile {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 10px;

            > select {
                padding: 0.8rem 1rem 0.8rem 1rem;
                font-weight: 400;
                color: ${(props) => props.theme.colors.white.light};
                border-radius: 0.5rem;
                background-color: ${(props) => props.theme.colors.background};
            }
        }

        .content {
            > .image {
                width: 100%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;

                > div {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    padding: 10px;
                    margin-bottom: 15px;
                    border-radius: 8px;
                    gap: 10px;
                    cursor: pointer;

                    &:hover {
                        background-color: ${(props) => props.theme.colors.tertiary};
                        opacity: 0.9;
                    }  
                }

                > .imagePost {
                    > img {
                        height: 50px;
                        object-fit: contain;
                        border-radius: 8px;
                    }
                }

                > .imagePostProfile {
                    > img {
                        height: 250px;
                        object-fit: contain;
                        border-radius: 8px;
                    }
                }
            }
        }
    }
`;
