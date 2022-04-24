import DomainBase from "./domainBase";
import { v4 as uuid } from 'uuid';

export class UserCommentGoodIdea extends DomainBase {

    constructor(
        public idUser: string,
        public idPostComment: string,
        public _id: string = uuid(),
        public created_at: Date = new Date(),
        public updated_at: Date = new Date()
    ) {

        super(_id, created_at, updated_at);
    }

    validateObject(): boolean {
        if (this.idUser == null) throw new Error("Id do usuário deve ser preenchido.");

        if (this.idPostComment == null) throw new Error("Id do comentário deve ser preenchido.");

        return true;
    }

}