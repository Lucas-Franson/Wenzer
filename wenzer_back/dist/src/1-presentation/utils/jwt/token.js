"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenJWT = exports.verifyTokenJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../../../4-infra/utils/logger"));
const verifyTokenJWT = (token) => {
    var _a;
    const chave = (_a = process.env.CHAVE_JWT) !== null && _a !== void 0 ? _a : '';
    let pld = "";
    try {
        pld = jsonwebtoken_1.default.verify(token, chave);
    }
    catch (err) {
        new logger_1.default('Verificar Token', err).log();
    }
    return pld === null || pld === void 0 ? void 0 : pld.id;
};
exports.verifyTokenJWT = verifyTokenJWT;
const createTokenJWT = (id) => {
    var _a;
    const payload = {
        id
    };
    const chave = (_a = process.env.CHAVE_JWT) !== null && _a !== void 0 ? _a : '';
    const token = jsonwebtoken_1.default.sign(payload, chave);
    return token;
};
exports.createTokenJWT = createTokenJWT;
//# sourceMappingURL=token.js.map