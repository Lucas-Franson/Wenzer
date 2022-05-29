import styled from 'styled-components';

export const Container = styled.div`
    display: none;
    justify-content: center;
    align-items: center;
    height: 100vh;

    &.displayNone {
        display: none;
    }

`;

export const ContainerModal = styled.div`
    width: min(90vw, 600px);
    height: auto;
    max-height: 435px;
    overflow-y: scroll;
    
    border-radius: 8px;
    background: ${props => props.theme.colors.secondary};
    box-sizing: border-box;
    margin: 0 auto;
    margin-top: 8rem;

    span {
        font-weight: 400;
        font-size: 1.1rem;
    }

    .btnViewing {
        display: flex;
        justify-content: space-between;

        button {
            margin: 5px;

            .btnLike {
                display: flex;
                align-items: center;
                justify-content: center;
                
                > svg {
                    &.active {
                    color: yellow;
                    }
                }
            }

        }

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

            > img {
                width: 100px;
            }

            > .payment-check {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                color: ${props => props.theme.colors.succes}
            }
        }

        .content {
            > .payment-value {
                padding-bottom:20px;
                font-size: 0.9rem;
            }

            > .participant {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
                padding: 10px;

                > .btnRejectAccept {
                    display: flex;
                    align-items: center;

                    > button {
                        margin: 5px;
                        padding: 0.4rem 1rem;
                    }
                }

                > .removeParticipant {
                    font-size: 0.8rem;
                    cursor: pointer;


                    &:hover {
                        color: ${props => props.theme.colors.primary}
                    }
                }

                > .participantHeader {
                    display: flex;
                    align-items: center;

                    div {
                        display: flex;
                        flex-direction: column;
                        
                        > span {
                            margin-left: 0px;
                        }

                        > p {
                            font-size: 0.8rem;
                        }
                   }

                   > .nameAndRole {
                        margin-left: 10px;
                        cursor: pointer;
                   }
                }
            }

            > .image {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
                cursor: pointer;

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

                > .buttons-image {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    width: inherit;

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
                }

                > .flex {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 10px;
                }
            }

            > .buttons {
                display: flex;
                gap: 5px;
            }

            > .coment-user {
                display: flex;
                align-items: center;

                > button {
                    margin-top: 0px;
                }

                > div > .height-coment {
                    margin-top: 15px;
                }
            }
        }

        >.ConfirmarDeleteModal {
            >.buttonDelete {
                margin-top: 15px;
                display: flex;
                gap: 15px;
            }

            > span {
                font-weight: 400;
                font-size: 0.9rem;
                color: ${props => props.theme.colors.grey};
            }

            > p {
                font-weight: 400;
            }
        }
    }

    &.payment {
        border-bottom: 3px solid  ${props => props.theme.colors.succes};
    }
`;
