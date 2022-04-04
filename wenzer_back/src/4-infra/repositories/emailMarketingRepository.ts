import { EmailMarketing } from "../../3-domain/entities/emailMarketing";
import { Orm } from "./orm";
import { IEmailMarketingRepository } from "../irepositories/IemailMarketingRepository";

export default class EmailMarketingRepository extends Orm<EmailMarketing> implements IEmailMarketingRepository {
    
    handleArrayResult(result: EmailMarketing[]) {
        if (result && result instanceof Array && result.length > 0) {
            let emailMarketings: any[] = [];
            result.forEach((value: EmailMarketing) => {
                let emailMarketing = new EmailMarketing(
                    value.email,
                    value.emailValid,
                    value._id,
                    value.created_at,
                    value.updated_at
                );
                emailMarketings.push(emailMarketing);
            });
            return emailMarketings;
        } 
        else {
            return [];
        }
    }

    handleResult(results: EmailMarketing): EmailMarketing | null {
        if(results && !(results instanceof Array)) {
            return new EmailMarketing(
                results.email,
                results.emailValid,
                results._id,
                results.created_at,
                results.updated_at
            );
        }
        else {
            return null;
        }
    }

}