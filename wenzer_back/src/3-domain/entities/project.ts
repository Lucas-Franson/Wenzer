import { v4 as uuid } from 'uuid';
import { IDomainBase } from './IdomainBase';

export class Project implements IDomainBase {

    id: string = '';
    name: string = '';
    description: string = '';
    photo: string = '';
    active: boolean = false;
    public: boolean = false;
    created_at: Date = new Date();
    updated_at: Date = new Date();

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}