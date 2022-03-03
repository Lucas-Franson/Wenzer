import DomainBase from './domainBase';

export class Project extends DomainBase {

    constructor(
        public name: string,
        public description: string,
        public photo: Blob,
        public active: boolean,
        public publicProject: boolean,
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