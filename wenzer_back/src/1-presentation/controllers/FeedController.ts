const FeedService = require('../../2-application/services/FeedAppService');

module.exports = class FeedController {

    async getAllPosts(req: any, res: any, next: any) {
        const { page, countPerPage } = req.body;
        const feedService = new FeedService();
        
        try {
            const posts = await feedService.getAllPosts(req.session.userId, page, countPerPage);

            res.status(200).json(posts);
        } catch(err) {
            next(err);
        }
    }

}