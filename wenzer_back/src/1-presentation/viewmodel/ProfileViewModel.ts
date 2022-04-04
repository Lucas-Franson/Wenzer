import { Interests } from "../../3-domain/entities/interests";
import { ErroParametro } from "../../erros";
import { InterestsFormViewModel } from "./InterestsFormViewModel";

export class ProfileViewModel {
    
    constructor(
        public _id: string,
        public name: string,
        public bio: string,
        public interests: InterestsFormViewModel[],
        public photo: any,
        public countProjects: number,
        public countParticipating: number
    ) {

    }

    public getName = () => { return this.name }

    public getBio = () => { return this.bio }

    public getInterests = () => { return this.interests }

    public validateModel() {
        if (typeof this.name !== 'string') throw new ErroParametro('Nome: deve ser texto.');

        if (this.bio != '' && typeof this.bio !== 'string') throw new ErroParametro('Bio: deve ser texto.');

        if (this.interests != null && typeof this.interests !== 'object') throw new ErroParametro('Interesses: deve ser um array de objeto.');

        if (this.name == '') throw new ErroParametro('Nome: não deve ser vazio.');
    }

}