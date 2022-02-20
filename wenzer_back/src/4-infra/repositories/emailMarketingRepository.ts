import { EmailMarketing } from "../../3-domain/entities/emailMarketing";
import { IOrm } from "../irepositories/Iorm";
import { Orm } from "./orm";
import { IEmailMarketingRepository } from "../irepositories/IemailMarketingRepository";

export default class EmailMarketingRepository extends Orm<EmailMarketing> implements IEmailMarketingRepository, IOrm<EmailMarketing> {
    
    async validateObject(object: EmailMarketing):Promise<boolean> {
        let isValid = true;

        if (object.id == null) {
            isValid = false;
        }

        if (object.email == null) {
            isValid = false;
        }

        if (object.emailValid == null) {
            isValid = false;
        }

        return isValid;
    }
}