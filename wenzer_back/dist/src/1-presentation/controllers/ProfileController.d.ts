export default class ProfileController {
    getAllInterests(req: any, res: any, next: any): Promise<void>;
    getInfoUserProfile(req: any, res: any, next: any): Promise<void>;
    editProfile(req: any, res: any, next: any): Promise<void>;
    editPhoto(req: any, res: any, next: any): Promise<void>;
    followUser(req: any, res: any, next: any): Promise<void>;
    connections(req: any, res: any, next: any): Promise<void>;
    interests(req: any, res: any, next: any): Promise<void>;
    getAllPosts(req: any, res: any, next: any): Promise<void>;
}
