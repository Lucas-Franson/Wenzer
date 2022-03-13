import { Followers } from "../../3-domain/entities/followers";
import { IOrm } from "../irepositories/Iorm";
import { Orm } from "./orm";
import { IFollowersRepository } from "../irepositories/IfollowersRepository";

export class FollowersRepository extends Orm<Followers> implements IFollowersRepository {
    
    convertToFollowerObject(follower: any) {
        if (!follower) return null;

        return new Followers(
            follower?.idProject,
            follower?.idUser,
            follower?.id,
            follower?.created_at,
            follower?.updated_at
        );
    }
}