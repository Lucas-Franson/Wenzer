"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValideSeuEmail = exports.NaoAutorizado = exports.NaoEncontrado = exports.UsuarioJaCadastrado = void 0;
class UsuarioJaCadastrado extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'UsuarioJaCadastrado';
    }
}
exports.UsuarioJaCadastrado = UsuarioJaCadastrado;
class NaoEncontrado extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'NaoEncontrado';
    }
}
exports.NaoEncontrado = NaoEncontrado;
class NaoAutorizado extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'NaoAutorizado';
    }
}
exports.NaoAutorizado = NaoAutorizado;
class ValideSeuEmail extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'ValideSeuEmail';
    }
}
exports.ValideSeuEmail = ValideSeuEmail;
//# sourceMappingURL=erros.js.map