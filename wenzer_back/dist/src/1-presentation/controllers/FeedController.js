"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const erros_1 = require("../../erros");
class FeedController {
    getAllPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, countPerPage } = req.body;
            try {
                if (!page || !countPerPage) {
                    throw new erros_1.ErroParametro('Falta parâmetro para recuperar os registros de feed.');
                }
                const posts = yield req.service.feedService.getAllPosts(req.session.userId, page, countPerPage);
                res.status(200).json(posts);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = FeedController;
//# sourceMappingURL=FeedController.js.map