export interface IEmail {
    sendEmail(): Promise<void>;
    prepareHTML(link: string): Promise<void>;
}