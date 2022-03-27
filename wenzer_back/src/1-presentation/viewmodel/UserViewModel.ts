

export default class UserViewModel {

    constructor(
        public id: string,
        public name: string,
        public email: string, 
        public password: string,
        public title: string,
        public photo: any,
        public bio: string,
        public emailValid: boolean,
        public created_at: Date
    ) {

    }

}