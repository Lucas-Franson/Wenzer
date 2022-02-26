import { ErroParametro } from "../../erros";

export default class FeedController {

    async getAllPosts(req: any, res: any, next: any) {
        const { page, countPerPage } = req.body;
        
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

}