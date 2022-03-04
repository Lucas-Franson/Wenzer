import { Interests } from "../../3-domain/entities/interests";
export declare class ProfileViewModel {
    private name;
    private bio;
    private photo;
    private title;
    private interests;
    constructor(name: string, bio: string, photo: any, title: string, interests: Interests[]);
    getName: () => string;
    getBio: () => string;
    getPhoto: () => any;
    getTitle: () => string;
    getInterests: () => Interests[];
    validateModel(): void;
}
