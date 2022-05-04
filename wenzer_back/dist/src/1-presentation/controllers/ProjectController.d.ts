export default class ProjectController {
    get(req: any, res: any, next: any): Promise<void>;
    create(req: any, res: any, next: any): Promise<void>;
    update(req: any, res: any, next: any): Promise<void>;
    delete(req: any, res: any, next: any): Promise<void>;
    getByUser(req: any, res: any, next: any): Promise<void>;
    highProjects(req: any, res: any, next: any): Promise<void>;
    search(req: any, res: any, next: any): Promise<void>;
    follow(req: any, res: any, next: any): Promise<void>;
    createPost(req: any, res: any, next: any): Promise<void>;
    setUserProjectGoodIdea(req: any, res: any, next: any): Promise<void>;
}
