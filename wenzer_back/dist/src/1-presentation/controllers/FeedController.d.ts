export default class FeedController {
    getAllPosts(req: any, res: any, next: any): Promise<void>;
    getPostById(req: any, res: any, next: any): Promise<void>;
    setPostAsGoodIdea(req: any, res: any, next: any): Promise<void>;
    getAllComments(req: any, res: any, next: any): Promise<void>;
    setComments(req: any, res: any, next: any): Promise<void>;
    setCommentAsGoodIdea(req: any, res: any, next: any): Promise<void>;
    setSubComment(req: any, res: any, next: any): Promise<void>;
    projectsByInterests(req: any, res: any, next: any): Promise<void>;
    getProjectsMarketing(req: any, res: any, next: any): Promise<void>;
    setDateOfLastPost(req: any, res: any, next: any): Promise<void>;
    deletePost(req: any, res: any, next: any): Promise<void>;
}
