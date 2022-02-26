import DomainBase from './domainBase';

export class Post extends DomainBase {

    constructor(
        public idUser: string,
        public countViews: number,
        public title: string,
        public description: string,
        public photo: Blob,
        public idProject: string,
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