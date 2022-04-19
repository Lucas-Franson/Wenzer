import { Socket } from "socket.io-client";

export interface IWenzerContext {
    paymentImpulsionamento: boolean;
    setPaymentImpulsionamento(state: boolean): void;
    openModalProject: boolean;
    setOpenModalProject(state: boolean): void;
    getSocketIOClient(): Socket;
};
