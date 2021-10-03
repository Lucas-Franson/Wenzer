declare class Email {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
    constructor(from: string, to: string, subject: string, text: string, html: string);
    sendEmail(): Promise<void>;
}
declare class EmailVerify extends Email {
    constructor(email: string);
    prepareHTML(link: string): Promise<void>;
}
declare class EmailResetPassword extends Email {
    constructor(user: any, address: string);
}
declare class EmailMarketingSend extends Email {
    constructor(email: string);
    prepareHTML(link: string): Promise<void>;
}
declare const _default: {
    EmailVerify: typeof EmailVerify;
    EmailResetPassword: typeof EmailResetPassword;
    EmailMarketingSend: typeof EmailMarketingSend;
};
export = _default;
