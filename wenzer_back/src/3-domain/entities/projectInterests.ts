import DomainBase from "./domainBase";
import { v4 as uuid } from 'uuid';

export class ProjectInterests extends DomainBase {

    constructor(
        public _idProject: string,
        public _idInterests: string,
        public _id: string = uuid(),
        public _createdAt: Date = new Date(),
        public _updatedAt: Date = new Date()
    ) {

        super(_id, _createdAt, _updatedAt);
    }

    validateObject(): boolean {
        return true;
    }

}