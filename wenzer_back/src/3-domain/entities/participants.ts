import DomainBase from './domainBase';

export class Participants extends DomainBase {

    constructor(
        public active: boolean,
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