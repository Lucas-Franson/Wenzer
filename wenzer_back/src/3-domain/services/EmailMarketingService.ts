import { createTokenJWT, verifyTokenJWT } from "../../1-presentation/utils/jwt/token";
import { IEmailMarketingRepository } from "../../4-infra/irepositories/IemailMarketingRepository";
import { EmailMarketing } from "../entities/emailMarketing";
import { IEmailMarketingService } from "../Iservices/IEmailMarketingService";
import { EmailMarketingSend } from "../utils/email/EmailMarketingSend";

export default class EmailMarketingService implements IEmailMarketingService {

    constructor(private readonly emailMarketingRepository: IEmailMarketingRepository) {
    }

    async findEmailMarketing(email: string): Promise<EmailMarketing | null> {
        const where = { email };
        const emailMarketing = await this.emailMarketingRepository.getByWhereClause(where);
        if (emailMarketing.length > 0) {
            return emailMarketing[0];
        }
        return null;
    }

    async findEmailMarketingByToken(token: string): Promise<EmailMarketing | null> {
        const email = verifyTokenJWT(token);
        const where = { email };
        const emailMarketing = await this.emailMarketingRepository.getByWhereClause(where);
        if (emailMarketing.length > 0) {
            return emailMarketing[0];
        }
        return null;
    }

    async create(email: string) {
        let emailToCreate = new EmailMarketing(email);
        this.emailMarketingRepository.insert(emailToCreate);
    }

    async validateEmailMarketing(emailMarketing: EmailMarketing) {
        if (emailMarketing.emailIsValid()) {
            throw new Error('Email já validado.');
        }

        emailMarketing.validateEmail();
        await this.emailMarketingRepository.update(emailMarketing);
    }

    async sendEmailMarketingVerification(email: string) {
        const token = createTokenJWT(email);
        const route = '?token=';
        const address = `${process.env.BASE_URL_WEB}${route}${token}`;

        if (process.env.ENVIRONMENT === 'desenv') console.log(address);

        const sendEmail = new EmailMarketingSend(email);
        await sendEmail.prepareHTML(address);
        sendEmail.sendEmail();
    }

}