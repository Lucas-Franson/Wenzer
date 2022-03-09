import { IEmailMarketingRepository } from "../../4-infra/irepositories/IemailMarketingRepository";
import { EmailMarketing } from "../entities/emailMarketing";
import { IEmailMarketingService } from "../Iservices/IEmailMarketingService";
export default class EmailMarketingService implements IEmailMarketingService {
    private readonly emailMarketingRepository;
    constructor(emailMarketingRepository: IEmailMarketingRepository);
    findEmailMarketing(email: string): Promise<EmailMarketing | null>;
    findEmailMarketingByToken(token: string): Promise<EmailMarketing | null>;
    create(email: string): Promise<void>;
    validateEmailMarketing(emailMarketing: EmailMarketing): Promise<void>;
    sendEmailMarketingVerification(email: string): Promise<void>;
}
