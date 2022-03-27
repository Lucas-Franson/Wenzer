import { Interests } from "../../3-domain/entities/interests";
import { ErroParametro } from "../../erros";
import { InterestsViewModel } from "./InterestsViewModel";

export class ProfileViewModel {
    
    constructor(
        private id: string,
        private name: string,
        private bio: string,
        private photo: any,
        private title: string,
        private interests: InterestsViewModel[],
        private countProjects: number,
        private countParticipating: number
    ) {

    }

    public getName = () => { return this.name }

    public getBio = () => { return this.bio }

    public getPhoto = () => { return this.photo }

    public getTitle = () => { return this.title }

    public getInterests = () => { return this.interests }

    public validateModel() {
        if (typeof this.name !== 'string') throw new ErroParametro('Nome: deve ser texto.');

        if (this.bio != '' && typeof this.bio !== 'string') throw new ErroParametro('Bio: deve ser texto.');

        if (this.photo != '' && typeof this.photo !== 'object') throw new ErroParametro('Foto: deve ser uma imagem.');

        if (this.title != '' && typeof this.title !== 'string') throw new ErroParametro('Titulo: deve ser um texto.');

        if (this.interests != null && typeof this.interests !== 'object') throw new ErroParametro('Interesses: deve ser um array de objeto.');

        if (this.name == '') throw new ErroParametro('Nome: não deve ser vazio.');
    }

}