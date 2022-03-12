import { ErroParametro } from "../../erros";

export default class FeedController {

    async getAllPosts(req: any, res: any, next: any) {
        const { page, countPerPage } = req.params;
        
        try {
            if (!page || !countPerPage) {
                throw new ErroParametro('Falta parâmetro para recuperar os registros de feed.');
            }

            const posts = await req.service.feedService.getAllPosts(req.session.userId, page, countPerPage);

            res.status(200).json(posts);
        } catch(err) {
            next(err);
        }
    }

    async setPostAsGoodIdea(req: any, res: any, next: any) {
        const { postId } = req.body;
        
        try {
            if (!postId) {
                throw new ErroParametro('Falta parâmetro para dar boa ideia no post.');
            }

            await req.service.feedService.setGoodIdea(req.session.userId, postId);

            res.status(200).json();
        } catch(err) {
            next(err);
        }
    }

    async getAllComments(req: any, res: any, next: any) {
        const { postId } = req.body;
        
        try {
            if (!postId) {
                throw new ErroParametro('Falta parâmetro para buscar comentários do post.');
            }

            const comments = await req.service.feedService.getAllComments(req.session.userId, postId);

            res.status(200).json(comments);
        } catch(err) {
            next(err);
        }
    }

    async setComments(req: any, res: any, next: any) {
        const { postId, text } = req.body;
        
        try {
            if (!postId || !text || text.trim() == '') {
                throw new ErroParametro('Falta parâmetro para buscar comentários do post.');
            }

            await req.service.feedService.setComments(req.session.userId, postId, text);

            res.status(200).json();
        } catch(err) {
            next(err);
        }
    }

}