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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailMarketingSend = void 0;
const fs_1 = __importDefault(require("fs"));
const EmailAbstract_1 = require("./EmailAbstract");
const util_1 = require("util");
const readFile = (0, util_1.promisify)(fs_1.default.readFile);
const html = require("../../../1-presentation/views/Confirmar_Acesso_Marketing.html");
class EmailMarketingSend extends EmailAbstract_1.Email {
    constructor(email) {
        super('"Wenzer" <wenzer.marketing@gmail.com>', email, 'Bem-vindo ao Wenzer', ``, '');
    }
    prepareHTML(link) {
        return __awaiter(this, void 0, void 0, function* () {
            const _self = this;
            const text = yield readFile(html, 'utf8').then((data) => {
                _self.Html = data.replace('$_TOKEN_$', link);
            });
        });
    }
}
exports.EmailMarketingSend = EmailMarketingSend;
//# sourceMappingURL=EmailMarketingSend.js.map