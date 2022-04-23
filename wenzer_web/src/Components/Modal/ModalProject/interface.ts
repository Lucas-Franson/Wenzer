export interface IProjectProps {
    name: string,
    description: string,
    photo?: any,
    active: boolean,
    publicProject: boolean,
    marketing: boolean,
    userId: string,
    _id: string,
    created_at: Date,
    updated_at: Date,
    tags: [],
    following: boolean,
    user: any
}