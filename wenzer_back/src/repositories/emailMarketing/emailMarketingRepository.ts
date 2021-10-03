import { EmailMarketing } from "../../domain/emailMarketing";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IemailMarketingRepository } from "./IemailMarketingRepository";

export class emailMarketingRepository extends Orm<EmailMarketing> implements IemailMarketingRepository, IOrm<EmailMarketing> {
    
    async validateObject(object: EmailMarketing):Promise<boolean> {
        let isValid = true;

        if (object.ID == null) {
            isValid = false;
        }

        if (object.Email == null) {
            isValid = false;
        }

        if (object.EmailValid == null) {
            isValid = false;
        }

        return isValid;
    }
}