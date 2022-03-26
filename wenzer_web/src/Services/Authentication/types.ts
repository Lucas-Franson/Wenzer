export interface IAuthContext {
    logged: boolean;
    singIn(userInfo: IUserInfo): void;
    singOut(): void;
    openModalPost: boolean;
    setOpenModalPost(state: boolean): void;
    handleOpenModalPost(): void;
    userInfo: IUserInfo | null;
};

export interface IUserInfo {
    accessToken: string;
    email: string;
    name: string;
    photo: string;
}