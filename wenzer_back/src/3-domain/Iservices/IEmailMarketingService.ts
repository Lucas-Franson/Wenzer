import { EmailMarketing } from "../entities/emailMarketing";


export interface IEmailMarketingService {
    findEmailMarketing(email: string): Promise<EmailMarketing>;
    findEmailMarketingByToken(token: string): Promise<EmailMarketing>;
    create(email: string): void;
    validateEmailMarketing(emailMarketing: EmailMarketing): void;
}