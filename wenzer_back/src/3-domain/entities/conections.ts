import DomainBase from './domainBase';

export class Connections extends DomainBase {

    constructor(
        public idUser: string,
        public idFollower: string,
        public accepted: boolean,
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