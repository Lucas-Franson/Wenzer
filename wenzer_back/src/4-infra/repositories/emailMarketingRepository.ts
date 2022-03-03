import { EmailMarketing } from "../../3-domain/entities/emailMarketing";
import { IOrm } from "../irepositories/Iorm";
import { Orm } from "./orm";
import { IEmailMarketingRepository } from "../irepositories/IemailMarketingRepository";

export default class EmailMarketingRepository extends Orm<EmailMarketing> implements IEmailMarketingRepository {
    
}