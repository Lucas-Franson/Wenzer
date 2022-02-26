import { Interests } from "../../3-domain/entities/interests";
import { ErroParametro } from "../../erros";

export class ProfileViewModel {
    
    constructor(
        private name: string,
        private bio: string,
        private photo: Blob,
        private title: string,
        private interests: Interests[]
    ) {

    }

    public getName = () => { return this.name }

    public getBio = () => { return this.bio }

    public getPhoto = () => { return this.photo }

    public getTitle = () => { return this.title }

    public getInterests = () => { return this.interests }

    public validateModel() {
        if (typeof this.name !== 'string') throw new ErroParametro('Nome: deve ser texto.');

        if (typeof this.bio !== 'string') throw new ErroParametro('Bio: deve ser texto.');

        if (typeof this.photo !== 'object') throw new ErroParametro('Foto: deve ser uma imagem.');

        if (typeof this.title !== 'string') throw new ErroParametro('Titulo: deve ser um texto.');

        if (typeof this.interests !== 'object') throw new ErroParametro('Interesses: deve ser um array de objeto.');

        if (this.name !== '') throw new ErroParametro('Nome: não deve ser vazio.');
    }

}