import { Interests } from "../../3-domain/entities/interests";
import { ErroParametro } from "../../erros";
import { InterestsFormViewModel } from "./InterestsFormViewModel";

export class ProfileViewModel {
    
    constructor(
        public _id: string,
        public name: string,
        public lastName: string,
        public bio: string,
        public university: string,
        public interests: InterestsFormViewModel[],
        public photo: any,
        public hasCompany: boolean,
        public countProjects: number,
        public countParticipating: number
    ) {

    }

    public getName = () => { return this.name }

    public getLastName = () => { return this.lastName }

    public getBio = () => { return this.bio }

    public getUniversity = () => { return this.university }
    
    public getHasCompany = () => { return this.hasCompany }

    public getInterests = () => { return this.interests }

    public validateModel() {
        if (typeof this.name !== 'string') throw new ErroParametro('Nome: deve ser texto.');

        if (this.bio != '' && typeof this.bio !== 'string') throw new ErroParametro('Bio: deve ser texto.');

        if (this.interests != null && typeof this.interests !== 'object') throw new ErroParametro('Interesses: deve ser um array de objeto.');

        if (this.name == '') throw new ErroParametro('Nome: não deve ser vazio.');
    }

}