import { v4 as uuid } from 'uuid';
import { IDomainBase } from '../domain/domainBase';

export class Project implements IDomainBase {

    ID: string = '';
    Name: string = '';
    Description: string = '';
    Photo: string = '';
    Active: boolean = false;
    Public: string = '';
    Created_at: Date = new Date();
    Updated_at: Date = new Date();

    constructor() {
        if (!this.ID) {
            this.ID = uuid();
        }
    }

}