import { Followers } from "../../3-domain/entities/followers";
import { IOrm } from "../irepositories/Iorm";
import { Orm } from "./orm";
import { IFollowersRepository } from "../irepositories/IfollowersRepository";

export class FollowersRepository extends Orm<Followers> implements IFollowersRepository, IOrm<Followers> {
    
    async validateObject(object: Followers):Promise<boolean> {
        let isValid = true;

            if (object.id == null) {
                isValid = false;
            }
    
            return isValid;
        }
}