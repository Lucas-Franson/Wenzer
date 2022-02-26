import { EmailMarketing } from "../entities/emailMarketing";


export interface IEmailMarketingService {
    findEmailMarketing(email: string): Promise<EmailMarketing | null>;
    findEmailMarketingByToken(token: string): Promise<EmailMarketing | null>;
    create(email: string): void;
    validateEmailMarketing(emailMarketing: EmailMarketing): void;
}