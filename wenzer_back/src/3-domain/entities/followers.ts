import DomainBase from './domainBase';
import { v4 as uuid } from 'uuid';

export class Followers extends DomainBase {

    constructor(
        public idProject: string,
        public idUser: string,
        public id: string = uuid(),
        public created_at: Date = new Date(),
        public updated_at: Date = new Date()
    ) {
            
        super(id, created_at, updated_at);
    }

    validateObject = () => {
        return true;
    }
    
}