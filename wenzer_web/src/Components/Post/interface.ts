export interface IPostProps {
    created_at?: Date;
    description: string;
    id: number;
    idProject: number;
    idUser: number;
    photo: any;
    title: string;
    updated_at?: Date;
    goodIdea: boolean;
    user: { name: string, photo: any }
}