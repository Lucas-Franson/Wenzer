import DomainBase from "./domainBase";
import { v4 as uuid } from 'uuid';

export class ProjectInterests extends DomainBase {

    constructor(
        public idProject: string,
        public idInterests: string,
        public _id: string = uuid(),
        public created_at: Date = new Date(),
        public updated_at: Date = new Date()
    ) {

        super(_id, created_at, updated_at);
    }

    validateObject(): boolean {
        return true;
    }

}