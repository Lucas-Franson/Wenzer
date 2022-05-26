export interface IPostProps {
    created_at?: Date;
    description: string;
    _id: string;
    idProject: number;
    idUser: string;
    photo: any;
    title: string;
    updated_at?: Date;
    goodIdea: boolean;
    user: { _id: string, name: string, lastName: string, photo: any };
    removePost: any;
    type: PostTypeEnum;
    countGoodIdea: number;
}

export enum PostTypeEnum {
    Feed,
    Comment
}