export interface IAuthContext {
    logged: boolean;
    singIn(userInfo: IUserInfo): void;
    singOut(): void;
    userInfo: IUserInfo | null;
    setPhoto(photo: string): void;
};

export interface IUserInfo {
    accessToken: string;
    id: string;
    email: string;
    name: string;
    photo: string;
}