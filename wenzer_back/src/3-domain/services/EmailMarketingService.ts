import { createTokenJWT, verifyTokenJWT } from "../../1-presentation/utils/jwt/token";
import { IEmailMarketingRepository } from "../../4-infra/irepositories/IemailMarketingRepository";
import { EmailMarketing } from "../entities/emailMarketing";
import { IEmailMarketingService } from "../Iservices/IEmailMarketingService";
import { EmailMarketingSend } from "../utils/email/EmailMarketingSend";

export default class EmailMarketingService implements IEmailMarketingService {

    constructor(private readonly emailMarketingRepository: IEmailMarketingRepository) {
    }

    async findEmailMarketing(email: string) {
        const where = `WHERE Email = '${email}'`;
        return await this.emailMarketingRepository.get(where);
    }

    async findEmailMarketingByToken(token: string) {
        const email = verifyTokenJWT(token);
        const where = `WHERE Email = '${email}'`;
        return await this.emailMarketingRepository.get(where);
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
        const token = createTokenJWT(email, [1, 'h']);
        const route = '?token=';
        const address = `${process.env.BASE_URL_WEB}${route}${token}`;

        if (process.env.ENVIRONMENT === 'desenv') console.log(address);

        const sendEmail = new EmailMarketingSend(email);
        await sendEmail.prepareHTML(address);
        sendEmail.sendEmail();
    }

}