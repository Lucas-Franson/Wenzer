export interface IPostProps {
    created_at?: Date;
    description: string;
    _id: string;
    idProject: number;
    idUser: number;
    photo: any;
    title: string;
    updated_at?: Date;
    goodIdea: boolean;
    user: { _id: string, name: string, photo: any }
}