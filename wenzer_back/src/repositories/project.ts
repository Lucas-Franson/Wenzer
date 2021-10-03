import { v4 as uuid } from 'uuid';
import { conexao, queryPromise } from './conexao';
import {User} from './user';
import {Post} from './post';

export class Project {

    Id = '';
    Name = '';
    Description = '';
    Photo = '';
    Active = '';
    Public = '';
    Created_at = new Date();
    Post: Post = new Post();

    constructor() {
        if (!this.Id) {
            this.Id = uuid();
        }
    }

    ValidarDados() {
        let isValid = true;

        if (this.Name == null) {
            isValid = false;
        }

        if (this.Description == null) {
            isValid = false;
        }

        if (this.Photo == null) {
            isValid = false;
        }

        if (this.Active == null) {
            isValid = false;
        }

        if (this.Public == null) {
            isValid = false;
        }

        return isValid;
    }

}