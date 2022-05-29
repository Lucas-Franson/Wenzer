import { Socket } from "socket.io-client";

export interface IWenzerContext {
    paymentImpulsionamento: boolean;
    setPaymentImpulsionamento(state: boolean): void;
    searchKey: string;
    setSearchKey(string: string): void;
    openModalProject: boolean;
    setOpenModalProject(state: boolean): void;
    getSocketIOClient(): Socket;
    isSearching: any;
    setIsSearching: any;
    scrollBottom: boolean;
    setScrollBottom(state: boolean): void;
};
