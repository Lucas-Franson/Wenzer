export declare class SearchViewModel {
    _id: string;
    name: string;
    bio: string;
    type: SearchType;
    photo: any;
    constructor(_id: string, name: string, bio: string, type: SearchType, photo: any);
}
export declare enum SearchType {
    People = 0,
    Project = 1,
    Post = 2
}
