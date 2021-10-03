import { conexao, queryPromise } from './conexao';
import { v4 as uuid } from 'uuid';
import {User} from './user';
import {Project} from './project';
const util = require('util');

export class Followers {

    IdUser = '';
    IdProject = '';
    User: User = new User();
    Created_at = new Date();
    Project : Project = new Project();

    ValidarDados() {
        let isValid = true;

        if (this.IdUser == null) {
            isValid = false;
        }

        if (this.IdProject == null) {
            isValid = false;
        }

        return isValid;
    }

}