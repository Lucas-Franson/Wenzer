import { v4 as uuid } from 'uuid';
import { IDomainBase } from '../domain/domainBase';

export class Post implements IDomainBase{

    ID: string = '';
    QtView: number = 0;
    Title: string = '';
    Description: string = '';
    Photo: string = '';
    Created_at: Date = new Date();
    Updated_at: Date = new Date();

    constructor() {
        if (!this.ID) {
            this.ID = uuid();
        }
    }

}