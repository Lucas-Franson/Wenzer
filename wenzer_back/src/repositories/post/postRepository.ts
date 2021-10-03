import { Post } from "../../domain/post";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IPostRepository } from "./IpostRepository";

export class PostRepository extends Orm<Post> implements IPostRepository, IOrm<Post> {
    
    async validateObject(object: Post):Promise<boolean> {
        let isValid = true;

        if (object.ID == null) {
            isValid = false;
        }

        if (object.QtView == null) {
            isValid = false;
        }

        if (object.Title == null) {
            isValid = false;
        }

        if (object.Description == null) {
            isValid = false;
        }

        if (object.Photo == null) {
            isValid = false;
        }

        return isValid;
    }
}