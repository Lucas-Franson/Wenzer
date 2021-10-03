import { Followers } from "../../domain/followers";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IFollowersRepository } from "./IfollowersRepository";

export class FollowersRepository extends Orm<Followers> implements IFollowersRepository, IOrm<Followers> {
    
    async validateObject(object: Followers):Promise<boolean> {
        let isValid = true;

            if (object.ID == null) {
                isValid = false;
            }
    
            return isValid;
        }
}