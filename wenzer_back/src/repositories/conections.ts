import { conexao, queryPromise } from './conexao';
import { v4 as uuid } from 'uuid';
import {User} from './user';
import {Followers} from './followers';
const util = require('util');

export class Connections {

    IdUser = '';
    IdFollower = '';
    User: User = new User();
    Created_at = new Date();
    Followers : Followers = new Followers();

    ValidarDados() {
        let isValid = true;

        if (this.IdUser == null) {
            isValid = false;
        }

        if (this.IdFollower == null) {
            isValid = false;
        }

        return isValid;
    }

}