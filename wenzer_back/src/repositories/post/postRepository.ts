import { Post } from "../../domain/post";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IPostRepository } from "./IpostRepository";

export class PostRepository extends Orm<Post> implements IPostRepository, IOrm<Post> {
    
    async validateObject(object: Post):Promise<boolean> {
        let isValid = true;

        if (object.id == null) {
            isValid = false;
        }

        if (object.qtView == null) {
            isValid = false;
        }

        if (object.title == null) {
            isValid = false;
        }

        if (object.description == null) {
            isValid = false;
        }

        if (object.photo == null) {
            isValid = false;
        }

        return isValid;
    }
}