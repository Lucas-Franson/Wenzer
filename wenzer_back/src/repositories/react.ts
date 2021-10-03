import { v4 as uuid } from 'uuid';
import { conexao, queryPromise } from './conexao';
import {User} from './user';
import {Post} from './post';

export class React {

    Id = '';
    IdUser = '';
    IdPost = '';
    Type = '';
    User: User = new User();
    Created_at = new Date();
    Post: Post = new Post();

    constructor() {
        if (!this.Id) {
            this.Id = uuid();
        }
    }

    ValidarDados() {
        let isValid = true;

        if (this.IdUser == null) {
            isValid = false;
        }

        if (this.IdPost == null) {
            isValid = false;
        }

        if (this.Type == null) {
            isValid = false;
        }

        return isValid;
    }

}