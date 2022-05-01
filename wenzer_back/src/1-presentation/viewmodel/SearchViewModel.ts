export class SearchViewModel {
    
    constructor(
        public _id: string,
        public name: string,
        public bio: string,
        public type: SearchType,
        public photo: any
    ) {

    }
}

export enum SearchType {
    People,
    Project,
    Post
}