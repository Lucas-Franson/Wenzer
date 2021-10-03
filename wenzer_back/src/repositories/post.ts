import { conexao, queryPromise } from './conexao';
import { v4 as uuid } from 'uuid';
import {User} from './user';
import {Project} from './project';
const util = require('util');

export class Post {

    Id = '';
    IdCreatorUser = '';
    QtView = '';
    Title = '';
    Description = '';
    Photo = '';
    IdRelatedProject = '';
    User: User = new User();
    Created_at = new Date();
    Project : Project = new Project();

    constructor() {
        if (!this.Id) {
            this.Id = uuid();
        }
    }

    ValidarDados() {
        let isValid = true;

        if (this.IdCreatorUser == null) {
            isValid = false;
        }

        if (this.QtView == null) {
            isValid = false;
        }

        if (this.Title == null) {
            isValid = false;
        }

        if (this.Description == null) {
            isValid = false;
        }

        if (this.Photo == null) {
            isValid = false;
        }

        if (this.IdRelatedProject == null) {
            isValid = false;
        }

        return isValid;
    }

}