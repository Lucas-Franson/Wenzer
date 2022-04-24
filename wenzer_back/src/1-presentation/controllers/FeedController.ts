import { ErroParametro } from "../../erros";

export default class FeedController {

    async getAllPosts(req: any, res: any, next: any) {
        const { page, countPerPage } = req.query;
        
        try {
            if (!page || !countPerPage) {
                throw new ErroParametro('Falta parâmetro para recuperar os registros de feed.');
            }

            const posts = await req.service.feedAppService.getAllPosts(req.session.userId, page, countPerPage);

            res.status(200).json(posts);
        } catch(err) {
            next(err);
        }
    }

    async getPostById(req: any, res: any, next: any) {
        const { _id } = req.params;
        
        try {
            if (!_id) {
                throw new ErroParametro('Falta parâmetro para buscar post.');
            }

            const post = await req.service.feedAppService.getPostById(req.session.userId, _id);

            res.status(200).json(post);
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

            await req.service.feedAppService.setGoodIdea(req.session.userId, postId);

            res.status(200).json();
        } catch(err) {
            next(err);
        }
    }

    async getAllComments(req: any, res: any, next: any) {
        const { postId } = req.params;
        
        try {
            if (!postId) {
                throw new ErroParametro('Falta parâmetro para buscar comentários do post.');
            }

            const comments = await req.service.feedAppService.getAllComments(req.session.userId, postId);

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

            let comment = await req.service.feedAppService.setComments(req.session.userId, postId, text);

            res.status(200).json(comment);
        } catch(err) {
            next(err);
        }
    }

    async setCommentAsGoodIdea(req: any, res: any, next: any) {
        const { _id } = req.params;
        
        try {
            if (!_id) {
                throw new ErroParametro('Falta parâmetro para dar boa ideia no comentário.');
            }

            await req.service.feedAppService.setPostCommentGoodIdea(req.session.userId, _id);

            res.status(200).json();
        } catch(err) {
            next(err);
        }
    }

    async setSubComment(req: any, res: any, next: any) {
        const { idPostComment, text } = req.body;
        
        try {
            if (!idPostComment|| !text || text.trim() == '') {
                throw new ErroParametro('Falta parâmetro para buscar sub comentários.');
            }

            let comment = await req.service.feedAppService.setSubComment(req.session.userId, idPostComment, text);

            res.status(200).json(comment);
        } catch(err) {
            next(err);
        }
    }

    async projectsByInterests(req: any, res: any, next: any) {
        try {
            const projects = await req.service.feedAppService.getProjectsByInterests(req.session.userId);

            res.status(200).json(projects);
        } catch(err) {
            next(err);
        }
    }

    async getProjectsMarketing(req: any, res: any, next: any) {
        try {
            const projects = await req.service.feedAppService.getProjectsMarketing(req.session.userId);

            res.status(200).json(projects);
        } catch(err) {
            next(err);
        }
    }

    async setDateOfLastPost(req: any, res: any, next: any) {
        const { date } = req.body;
        try {
            if(!date) {
                throw new ErroParametro("Falta enviar a data.");
            }

            await req.service.feedAppService.setDateOfLastPost(req.session.userId, date);

            res.status(200).json();
        } catch(err) {
            next(err);
        }
    }

    async deletePost(req: any, res: any, next: any) {
        const { _id } = req.params;
        try {
            if(!_id) {
                throw new ErroParametro("Falta enviar o id do post.");
            }

            await req.service.feedAppService.deletePost(req.session.userId, _id);

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }

}