import { Followers } from "../../3-domain/entities/followers";
import { IFollowerRepository } from "../irepositories/IfollowerRepository";
import { Orm } from "./orm";

export class FollowerRepository extends Orm<Followers> implements IFollowerRepository {
    
    handleArrayResult(result: Followers[]) {
        if (result && result instanceof Array && result.length > 0) {
            let followers: any[] = [];
            result.forEach((value: Followers) => {
                let follower = new Followers(
                    value.idProject,
                    value.idUser,
                    value._id,
                    value.created_at,
                    value.updated_at
                );
                followers.push(follower);
            });
            return followers;
        } 
        else {
            return [];
        }
    }

    handleResult(results: Followers): Followers | null {
        if(results && !(results instanceof Array)) {
            return new Followers(
                results.idProject,
                results.idUser,
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