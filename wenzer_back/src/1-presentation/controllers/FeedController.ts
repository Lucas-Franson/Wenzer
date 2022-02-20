const FeedService = require('../../2-application/services/FeedAppService');

export default class FeedController {

    async getAllPosts(req: any, res: any, next: any) {
        const { page, countPerPage } = req.body;
        
        try {
            const posts = await req.service.feedService.getAllPosts(req.session.userId, page, countPerPage);

            res.status(200).json(posts);
        } catch(err) {
            next(err);
        }
    }

}