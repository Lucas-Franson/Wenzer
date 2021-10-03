import { v4 as uuid } from 'uuid';
import { conexao, queryPromise } from './conexao';

export class Interests {

    Id = '';
    Name = '';
    Created_at = new Date();

    constructor() {
        if (!this.Id) {
            this.Id = uuid();
        }
    }

    ValidarDados() {
        let isValid = true;

        if (this.Id == null) {
            isValid = false;
        }

        if (this.Name == null) {
            isValid = false;
        }

        return isValid;
    }

}