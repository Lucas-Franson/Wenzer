import { EmailMarketing } from "../../3-domain/entities/emailMarketing";
import { Orm } from "./orm";
import { IEmailMarketingRepository } from "../irepositories/IemailMarketingRepository";
export default class EmailMarketingRepository extends Orm<EmailMarketing> implements IEmailMarketingRepository {
}
