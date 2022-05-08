import { InterestsFormViewModel } from "./InterestsFormViewModel";
export declare class ProfileViewModel {
    _id: string;
    name: string;
    lastName: string;
    bio: string;
    university: string;
    interests: InterestsFormViewModel[];
    photo: any;
    hasCompany: boolean;
    countProjects: number;
    countParticipating: number;
    alreadyConnected: boolean;
    constructor(_id: string, name: string, lastName: string, bio: string, university: string, interests: InterestsFormViewModel[], photo: any, hasCompany: boolean, countProjects: number, countParticipating: number, alreadyConnected?: boolean);
    getName: () => string;
    getLastName: () => string;
    getBio: () => string;
    getUniversity: () => string;
    getHasCompany: () => boolean;
    getInterests: () => InterestsFormViewModel[];
    validateModel(): void;
}
