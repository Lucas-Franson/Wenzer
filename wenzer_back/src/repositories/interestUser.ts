import { v4 as uuid } from 'uuid';
import { conexao, queryPromise } from './conexao';
import {User} from './user';
import {Interests} from './interests';

export class InterestUser {

    IdInterests = '';
    IdUser = '';
    User: User = new User();
    Created_at = new Date();
    Interests: Interests = new Interests();

    ValidarDados() {
        let isValid = true;

        if (this.IdUser == null) {
            isValid = false;
        }

        if (this.IdInterests == null) {
            isValid = false;
        }

        return isValid;
    }

}