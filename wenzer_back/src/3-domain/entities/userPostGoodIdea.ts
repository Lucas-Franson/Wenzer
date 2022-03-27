import DomainBase from "./domainBase";
import { v4 as uuid } from 'uuid';

export class UserPostGoodIdea extends DomainBase {

    constructor(
        public _idUser: string,
        public _idPost: string,
        public _id: string = uuid(),
        public _created_at: Date = new Date(),
        public _updated_at: Date = new Date()
    ) {

        super(_id, _created_at, _updated_at);
    }

    validateObject(): boolean {
        if (this._idUser == null) throw new Error("Id do usuário deve ser preenchido.");

        if (this._idPost == null) throw new Error("Id do post deve ser preenchido.");

        return true;
    }

}