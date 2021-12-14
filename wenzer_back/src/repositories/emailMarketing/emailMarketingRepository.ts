import { EmailMarketing } from "../../domain/emailMarketing";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IEmailMarketingRepository } from "./IemailMarketingRepository";

export class EmailMarketingRepository extends Orm<EmailMarketing> implements IEmailMarketingRepository, IOrm<EmailMarketing> {
    
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