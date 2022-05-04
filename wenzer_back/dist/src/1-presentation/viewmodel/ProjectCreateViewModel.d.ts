import { InterestsFormViewModel } from "./InterestsFormViewModel";
export declare class ProjectCreateViewModel {
    _id: string;
    name: string;
    description: string;
    photo: any;
    active: boolean;
    publicProject: boolean;
    marketing: boolean;
    tags: InterestsFormViewModel[];
    created_at: Date;
    countGoodIdea: number;
    userId: string;
    following: boolean;
    user: any;
    goodIdea: boolean;
    constructor(_id: string, name: string, description: string, photo: any, active: boolean, publicProject: boolean, marketing: boolean, tags: InterestsFormViewModel[], created_at: Date, countGoodIdea: number, userId?: string, following?: boolean, user?: any, goodIdea?: boolean);
}
