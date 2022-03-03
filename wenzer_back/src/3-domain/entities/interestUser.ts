import DomainBase from './domainBase';

export class InterestUser extends DomainBase {

    
    constructor(
        public idInterests: string,
        public idUser: string,
        public id: string = '',
        public created_at: Date = new Date(),
        public updated_at: Date = new Date()
    ) {
        
        super(id, created_at, updated_at);
    }

    validateObject = () => {
        return true;
    }

}