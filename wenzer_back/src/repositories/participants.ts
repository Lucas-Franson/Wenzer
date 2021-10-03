import { v4 as uuid } from 'uuid';
import { conexao, queryPromise } from './conexao';
import {User} from './user';
import {Project} from './project';

export class Participants {

    IdProject = '';
    IdUser = '';
    User: User = new User();
    Created_at = new Date();
    Project: Project = new Project();

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