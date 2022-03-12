import DomainBase from "./domainBase";
import { v4 as uuid } from 'uuid';

export class PostComments extends DomainBase {

    constructor(
        public _idUser: string,
        public _idPost: string,
        public _text: string,
        public _id: string = uuid(),
        public _createdAt: Date = new Date(),
        public _updatedAt: Date = new Date()
    ) {

        super(_id, _createdAt, _updatedAt);
    }

    validateObject(): boolean {
        if (this._idUser == null) throw new Error("Id do usuário deve ser preenchido.");

        if (this._idPost == null) throw new Error("Id do post deve ser preenchido.");

        if (this._text == null || this._text.trim() == '') throw new Error("Texto do comentário deve ser preenchido.");

        return true;
    }

}